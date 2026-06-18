const CACHE_KEY = 'repo_data_cache';
const CACHE_TTL = 30 * 60 * 1000;
const MAX_CACHE_ENTRIES = 10;
const GITHUB_API_BASE_URL = 'https://api.github.com';
const GITHUB_API_HEADERS = {
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28'
};

export interface RepoData {
  repoName: string;
  repoDescription: string;
  repoStars: number;
  repoForks: number;
  repoLanguages: string[];
  authorName: string;
  authorAvatar: string;
  homepage: string;
}

type CacheEntry = {
  data: RepoData;
  cachedAt: number;
};

type CachePayload = {
  version: 2;
  repos: Record<string, CacheEntry>;
};

export type RepoFetchErrorCode = 'not_found' | 'rate_limited' | 'network' | 'unknown';

export class RepoFetchError extends Error {
  code: RepoFetchErrorCode;

  constructor(code: RepoFetchErrorCode, message: string) {
    super(message);
    this.name = 'RepoFetchError';
    this.code = code;
  }
}

const readCache = (): CachePayload => {
  const cachedData = localStorage.getItem(CACHE_KEY);
  if (!cachedData) return { version: 2, repos: {} };

  try {
    const parsedCache = JSON.parse(cachedData) as Partial<CachePayload>;
    if (parsedCache.version === 2 && parsedCache.repos) {
      return { version: 2, repos: parsedCache.repos };
    }
  } catch {
    localStorage.removeItem(CACHE_KEY);
  }

  return { version: 2, repos: {} };
};

const readCachedRepo = (cacheKey: string): RepoData | null => {
  const cache = readCache();
  const entry = cache.repos[cacheKey];
  if (!entry) return null;

  if (Date.now() - entry.cachedAt <= CACHE_TTL) {
    return entry.data;
  }

  delete cache.repos[cacheKey];
  localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  return null;
};

const writeCachedRepo = (cacheKey: string, data: RepoData) => {
  const cache = readCache();
  cache.repos[cacheKey] = { data, cachedAt: Date.now() };

  const entries = Object.entries(cache.repos)
    .sort(([, a], [, b]) => b.cachedAt - a.cachedAt)
    .slice(0, MAX_CACHE_ENTRIES);

  localStorage.setItem(CACHE_KEY, JSON.stringify({
    version: 2,
    repos: Object.fromEntries(entries)
  } satisfies CachePayload));
};

const getRateLimitMessage = (response: Response) => {
  const resetAt = Number(response.headers.get('x-ratelimit-reset'));
  if (!Number.isFinite(resetAt)) {
    return 'GitHub API 请求次数已用完，请稍后再试';
  }

  const resetTime = new Date(resetAt * 1000).toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit'
  });
  return `GitHub API 请求次数已用完，预计 ${resetTime} 后恢复`;
};

export const fetchRepoInfo = async (owner: string, repo: string): Promise<RepoData> => {
  const cacheKey = `${owner}/${repo}`.toLowerCase();
  const cachedRepo = readCachedRepo(cacheKey);
  if (cachedRepo) return cachedRepo;

  try {
    const [repoResponse, languagesResponse] = await Promise.all([
      fetch(`${GITHUB_API_BASE_URL}/repos/${owner}/${repo}`, { headers: GITHUB_API_HEADERS }),
      fetch(`${GITHUB_API_BASE_URL}/repos/${owner}/${repo}/languages`, { headers: GITHUB_API_HEADERS })
    ]);

    if (repoResponse.status === 404) {
      throw new RepoFetchError('not_found', '仓库不存在或没有访问权限');
    }

    if (repoResponse.status === 403 || repoResponse.status === 429) {
      throw new RepoFetchError('rate_limited', getRateLimitMessage(repoResponse));
    }

    if (!repoResponse.ok) {
      throw new RepoFetchError('unknown', `GitHub API 返回异常（${repoResponse.status}）`);
    }

    const repoInfo = await repoResponse.json();
    const languages = languagesResponse.ok
      ? await languagesResponse.json() as Record<string, number>
      : {};

    const sortedLanguages = Object.entries(languages)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([lang]) => lang);

    const repoData = {
      repoName: repoInfo.name,
      repoDescription: repoInfo.description || '暂无描述',
      repoStars: repoInfo.stargazers_count,
      repoForks: repoInfo.forks_count,
      repoLanguages: sortedLanguages.length > 0 ? sortedLanguages : ['Unknown'],
      authorName: repoInfo.owner.login,
      authorAvatar: repoInfo.owner.avatar_url,
      homepage: repoInfo.homepage || ''
    };

    writeCachedRepo(cacheKey, repoData);
    return repoData;
  } catch (error) {
    if (error instanceof RepoFetchError) throw error;
    console.error('获取仓库数据失败:', error);
    throw new RepoFetchError('network', '无法连接 GitHub API，请检查网络后重试');
  }
};
