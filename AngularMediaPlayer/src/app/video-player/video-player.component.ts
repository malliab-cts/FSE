import { Component, OnInit,ViewChild ,Directive} from '@angular/core';
import { PlayerComponent } from '../player/player.component';
import { ControlsComponent } from '../controls/controls.component';


@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',  
  styleUrls: ['./video-player.component.css']  
})
export class VideoPlayerComponent implements OnInit {
masterPl = '././assets/videos/sample_1.mp4';
currentPlayItem:any;
@ViewChild(PlayerComponent) playerComp: PlayerComponent;
@ViewChild(ControlsComponent) controlsComp: ControlsComponent;
  constructor() { 
    
  }
  ngOnInit() {
  }  
  onReplayButtonClick(playItem: string){
    debugger;   
    this.playerComp.replayVideo(playItem);    
  }
  onProgressChange(progressVal: number){
  //debugger;   
  this.controlsComp.updateProgress(progressVal);  
  }
  onPlayPauseBtnClick(val: string){
    debugger;   
    if(val=="play"){
      this.playerComp.playPausedMedia();  
    }else{
      this.playerComp.pauseMedia();
    }
  }
  onStopBtnClick(val: string){
    debugger;   
    this.playerComp.stopMedia();
  }
  onVolumeChange(direction: string){
    debugger;   
    this.playerComp.changeVolume(direction);
  }
  onMuteClick(mute: boolean){
    debugger;   
    this.playerComp.toogleMute(mute);
  }
  onPlayListChange(currentPlayItem: any){
    debugger;   
    this.masterPl=currentPlayItem.mediaSrc;
    this.currentPlayItem=currentPlayItem;
    this.playerComp.playMedia(this.masterPl);
    this.controlsComp.updatePlayPauseClass();
    this.controlsComp.updateLikeDislikeOnPlayListChange(currentPlayItem);
  }
  onLikeDislikeClick(type:string){
    debugger;
    if(type=="like"){
      if(this.currentPlayItem!=null){
        var key=this.currentPlayItem.mediaId+"_like";
        var likeCount=parseInt(localStorage.getItem(key));
        if(likeCount!=null && !isNaN(likeCount)){
          likeCount+=1;
        }else{
          likeCount=parseInt(this.currentPlayItem.likeCount);
        }
        localStorage.setItem(key,likeCount.toString());
        this.controlsComp.updateLikeUnlikeCounter(type,likeCount.toString());
      }
    }else{
      if(this.currentPlayItem!=null){
        var key=this.currentPlayItem.mediaId+"_dislike";
        var dislikeCount=parseInt(localStorage.getItem(key));
        if(dislikeCount!=null && !isNaN(dislikeCount)){
          dislikeCount+=1;
        }else{
          dislikeCount=parseInt(this.currentPlayItem.disLikeCount);
        }
        localStorage.setItem(key,dislikeCount.toString());
        this.controlsComp.updateLikeUnlikeCounter(type,dislikeCount.toString());
      }
    }
  }
}
