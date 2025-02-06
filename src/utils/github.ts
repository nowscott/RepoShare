const CACHE_KEY = 'repo_data_cache';

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

export const fetchRepoInfo = async (owner: string, repo: string): Promise<RepoData> => {
  const cacheKey = `${owner}/${repo}`;
  const cachedData = localStorage.getItem(CACHE_KEY);
  
  if (cachedData) {
    const parsedCache = JSON.parse(cachedData);
    if (parsedCache.key === cacheKey) {
      console.log('从缓存中获取仓库数据');
      return parsedCache.data;
    } else {
      // 如果缓存存在但不是当前请求的仓库，清除旧缓存
      localStorage.removeItem(CACHE_KEY);
    }
  }

  try {
    const [repoResponse, languagesResponse] = await Promise.all([
      fetch(`https://gh.llkk.cc/https://api.github.com/repos/${owner}/${repo}`),
      fetch(`https://gh.llkk.cc/https://api.github.com/repos/${owner}/${repo}/languages`)
    ]);

    if (!repoResponse.ok || !languagesResponse.ok) {
      throw new Error('获取仓库信息失败');
    }

    const repoInfo = await repoResponse.json();
    const languages = await languagesResponse.json();

    const sortedLanguages = Object.entries<number>(languages)
      .sort(([, a], [, b]) => (b as number) - (a as number))
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

  // 将成功获取的数据存入缓存
  localStorage.setItem(CACHE_KEY, JSON.stringify({
    key: cacheKey,
    data: repoData
  }));

  return repoData;
  } catch (error) {
    console.error('获取仓库数据失败:', error);
    throw error;
  }
};