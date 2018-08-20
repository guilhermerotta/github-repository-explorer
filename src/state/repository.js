export const SORT_OPTIONS = {
  'Star Gazers': { value: 'stargazers_count', dataType: 'number' },
  'Forks': { value: 'forks_count', dataType: 'number' },
  'Date': { value: 'updated_at', dataType: 'date' }
};

export default class Repository {
  constructor({
                id = -1,
                name = '',
                description = '',
                forks_count = 0,
                stargazers_count = 0,
                default_branch = 'master',
                owner = {},
                updated_at = ''
              }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.forks_count = forks_count;
    this.stargazers_count = stargazers_count;
    this.default_branch = default_branch;
    this.owner = {
      avatar_url: owner.avatar_url,
      login: owner.login
    };
    this.updated_at = updated_at;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getDescription() {
    return this.description;
  }

  getForksCount() {
    return this.forks_count;
  }

  getStargazersCount() {
    return this.stargazers_count;
  }

  getDefaultBranch() {
    return this.default_branch;
  }

  getAvatarUrl() {
    return this.owner.avatar_url;
  }

  getUpdatedAt() {
    return this.updated_at;
  }

  getOwner() {
    return this.owner.login;
  }

  serialize() {
    return { ...this };
  }
}