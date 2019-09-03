import { Component, OnInit } from '@angular/core';
import {DataService} from '../shared/data.service';
@Component({
  selector: 'app-add-new-video',
  templateUrl: './add-new-video.component.html',
  styleUrls: ['./add-new-video.component.css']
})
export class AddNewVideoComponent implements OnInit {
  mediaPlayList:any;
  videoTitle="";
  videoSource="";
  addBtn:boolean=true;
  isAnyNonApprovedMedia:boolean=false;
  itemToEdit:any;
  constructor(private dataService:DataService) {
   }
  ngOnInit() {
    debugger;
    this.dataService.currentMessage.subscribe(playList=>{
      this.mediaPlayList=playList;
      this.checkNonApprovedItem();
    });    
  }
  checkNonApprovedItem(){
    debugger;
    var flag=false;
    if(this.mediaPlayList!=null){
      for(var i=0;i<this.mediaPlayList.length;i++){
        if(this.mediaPlayList[i].approved==0){
          flag=true;
        }
      }
      if(flag){
        this.isAnyNonApprovedMedia=true;
      }else{
        this.isAnyNonApprovedMedia=false;
      }
    }
  }
  addVideo(){
    debugger;
    if(this.itemToEdit==null){
      var itemCount=this.mediaPlayList.length;
      var itemId="Item0"+(itemCount+1);
      var itemToAdd={
        "mediaId":itemId,
        "mediaTitle":this.videoTitle,
        "mediaSrc":this.videoSource,
        "likeCount":0,
        "disLikeCount":0,
        "approved":0
      }; 
      this.dataService.addNewMedia(itemToAdd);
    }
    else{
      this.dataService.editVideo(this.itemToEdit.mediaId,this.videoTitle,this.videoSource);
      this.addBtn=true;      
    }    
    this.videoTitle="";
    this.videoSource="";
  }
  approveVideo(mediaId:string){
    debugger;
    this.dataService.approveVideo(mediaId);
  }
  editVideo(itemToEdit:any){
    debugger;
    this.videoTitle=itemToEdit.mediaTitle;
    this.videoSource=itemToEdit.mediaSrc;
    this.addBtn=false;
    this.itemToEdit=itemToEdit;
  }
  deleteVideo(mediaId:string){
    debugger;
    this.dataService.deleteVideo(mediaId);
  }
}
