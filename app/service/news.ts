import { Service } from 'egg';

export class HackerNews extends Service {
  /**
   * request hacker news api
   * @param api - Api name
   * @param opts - urllib options
   */
  public async request(api: string, opts?: any) {
    const options = {
      dataType: 'json',
      timeout: '30s',
      ...opts,
    };

    const result = await this.ctx.curl(
      `${this.config.news.serverUrl}/${api}`,
      options,
    );
    return result.data;
  }

  /**
   * get top story ids
   * @param page - page number, 1-ase
   * @param pageSize - page count
   */

  public async getTopStories(
    page?: number,
    pageSize?: number,
  ): Promise<number[]> {
    page = page || 1;
    const requestPageSize = pageSize ?? this.config.news.pageSize;

    try {
      const result: any = await this.request('topstories.json', {
        data: {
          orderBy: '"$key"',
          startAt: `"${requestPageSize * (page - 1)}"`,
          endAt: `"${requestPageSize * page - 1}"`,
        },
      });
      return Object.keys(result).map((key) => result[key]);
    } catch (e) {
      this.ctx.logger.error(e);
      return [];
    }
  }

  /**
   * query item
   * @param id - itemId
   */
  public async getUser(id: Number) {
    return await this.request(`item/${id}.json`);
  }

  /**
   * get user info
   * @param id - userId
   */
  public async getItem(id: Number) {
    return await this.request(`user/${id}.json`);
  }
}
