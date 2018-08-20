export default class Commit {
  constructor({
                sha = -1,
                author = {},
                commit = {},
                html_url = '',
              }) {
    this.sha = sha;
    this.author = {
      avatar_url: author ? author.avatar_url : '',
      login: author ? author.login : ''
    };
    this.commit = {
      author: {
        date: commit.author.date
      },
      message: commit.message
    };
    this.html_url = html_url;
  }

  getSha() {
    return this.sha;
  }

  getAuthorLogin() {
    return this.author.login;
  }

  getAuthorAvatarUrl() {
    return this.author.avatar_url;
  }

  getUrl() {
    return this.html_url;
  }

  getMessage() {
    return this.commit.message;
  }

  getDate() {
    return this.commit.author.date;
  }

  serialize() {
    return { ...this };
  }
}