import { Injectable } from '@angular/core';

@Injectable()
export class MediaPlayerService {

  masterPl: string;
  constructor() { }

  public updateMasterPl(fileName: string){
    this.masterPl=fileName;

  }

  public getMasterPl(): string{
   return  this.masterPl;

  }

}
