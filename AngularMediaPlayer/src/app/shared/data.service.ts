import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {
playList:any;
private messageSource = new BehaviorSubject(this.playList);
currentMessage = this.messageSource.asObservable();
private _jsonURL = 'assets/mediaList.json'; 
constructor(private http: HttpClient) { 
    debugger;
    this.getJSON().subscribe(data => {
      debugger;
      this.playList=data.mediaList;
      if(this.playList!=null && this.playList.length>0){
          this.changeMessage(this.playList);        
        }
     });
  }
  getJSON(): Observable<any> {
    return this.http.get(this._jsonURL);
  }
  changeMessage(updatedPlayList: any) {
    this.messageSource.next(updatedPlayList)
  }
  addNewMedia(item:any){
      debugger;
    this.playList.push(item);
    this.changeMessage(this.playList);
  }
  editVideo(id:string,title:string,source:string){
    debugger;
    for(var i=0;i<this.playList.length;i++){
      if(this.playList[i].mediaId==id){
        this.playList[i].mediaTitle=title;
        this.playList[i].mediaSrc=source
        this.playList[i].approved=0;
      }
    }
    this.changeMessage(this.playList);
  }
  approveVideo(mediaId:string){
    debugger;
    for(var i=0;i<this.playList.length;i++){
      if(this.playList[i].mediaId==mediaId){
        this.playList[i].approved=1;
      }
    }
    this.changeMessage(this.playList);
  }
  deleteVideo(mediaId:string){
    debugger;
    var itemToDelete=null;
    for(var i=0;i<this.playList.length;i++){
      if(this.playList[i].mediaId==mediaId){
       itemToDelete=this.playList[i];
      }
    }
    if(itemToDelete!=null){
      this.playList.pop(itemToDelete);
      this.changeMessage(this.playList);
    }
  }
}