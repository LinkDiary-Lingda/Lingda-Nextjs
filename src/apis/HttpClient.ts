export default class HttpClient {
  protected baseUrl;
  constructor() {
    this.baseUrl = process.env.BASE_URL;
  }
}
