export default class Organization {
  constructor({
                id = -1,
                login = '',
                name = 'Organization Not Found',
                email = '',
                location = '',
                avatar_url = '',
                created_at = '',
                html_url = ''
              }) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.avatar_url = avatar_url;
    this.email = email;
    this.location = location;
    this.created_at = created_at;
    this.html_url = html_url;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getLogin() {
    return this.login;
  }

  getEmail() {
    return this.email;
  }

  getUrl() {
    return this.html_url;
  }

  getLocation() {
    return this.location;
  }

  getAvatarUrl() {
    return this.avatar_url;
  }

  getCreatedAt() {
    return this.created_at;
  }

  serialize() {
    return { ...this };
  }
}