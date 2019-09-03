import { Component, OnInit,Input, Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {
@Input('masterPl') originalItem:string;
progressValue:number=0; 
playPauseClass:string="play";
muteClass:string="mute";
likeCount:string="1";
dislikeCount:string="1";
@Output() replayItemEmitter: EventEmitter<any> = new EventEmitter<any>();
@Output() playPauseEmitter: EventEmitter<any> = new EventEmitter<any>();
@Output() stopEmitter: EventEmitter<any> = new EventEmitter<any>();
@Output() volumeChangeEmitter: EventEmitter<any> = new EventEmitter<any>();
@Output() muteEmitter: EventEmitter<any> = new EventEmitter<any>();
@Output() likeUnlikeEmitter: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }
  ngOnInit() {
  }
  replayMedia(){
      debugger;   
      this.playPauseClass="pause"  ;
      this.replayItemEmitter.emit(this.originalItem);
    }
  updateProgress(value:number){
    //debugger;
    this.progressValue=value;
  }
  togglePlayPause(){
    debugger;
    var currentBtnClick=this.playPauseClass;
    if(this.playPauseClass=="play"){
      this.playPauseClass="pause";
    }else{
      this.playPauseClass="play"
    } 	
    this.playPauseEmitter.emit(currentBtnClick);
  }
  stopPlayer(){
    debugger;
    this.playPauseClass="play";
    this.stopEmitter.emit("pause");
  }
  changeVolume(direction:string){
    debugger;
    this.volumeChangeEmitter.emit(direction);
  }
  toggleMute(mute:boolean){
    debugger;
    this.muteClass="unmute";
    this.muteEmitter.emit(mute);
  }
  updatePlayPauseClass(){
    this.playPauseClass="pause"  ;
  }
  toogleLikeDislike(type:string){
    this.likeUnlikeEmitter.emit(type);
  }
  updateLikeUnlikeCounter(type:string,count:string){
    debugger;
    if(type=="like"){
      this.likeCount=count;
    }else{
      this.dislikeCount=count;
    }
  }
  updateLikeDislikeOnPlayListChange(playItem:any){
    debugger;
      if(playItem!=null){
        var likeKey=playItem.mediaId+"_like";
        var likeCount=parseInt(localStorage.getItem(likeKey));
        if(likeCount==null || isNaN(likeCount)){
          likeCount=parseInt(playItem.likeCount);
        }
        localStorage.setItem(likeKey,likeCount.toString());        
        this.likeCount=likeCount.toString();
    
        var dislikeKey=playItem.mediaId+"_dislike";
        var dislikeCount=parseInt(localStorage.getItem(dislikeKey));
        if(dislikeCount==null || isNaN(dislikeCount)){
          dislikeCount=parseInt(playItem.disLikeCount);
        }
        localStorage.setItem(dislikeKey,dislikeCount.toString());
        this.dislikeCount=dislikeCount.toString();       
      }
    }  
}
