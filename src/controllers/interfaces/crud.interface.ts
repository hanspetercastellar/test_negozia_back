

export interface CrudInterface {

  create(data: any): Promise<any>;
  read?: (id: string)=> Promise<any>;
  update(id: string, data: any): Promise<any>;
  delete(id: string): Promise<any>;
  list(): Promise<any>;


}