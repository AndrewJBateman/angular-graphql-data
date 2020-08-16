import { Component, OnInit } from "@angular/core";
import { ElectronService } from "../providers/electron.service";
import { DataService } from "../data.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  channelInfo: any;
  channelSubscription: Subscription;

  constructor(private electron: ElectronService, private data: DataService) {}

  ngOnInit(): any {
    this.channel("UCVyRiMvfUNMA1UPlDPzG5Ow");
  }

  closeWindow(): any {
    this.electron.window.close();
  }
  minimizeWindow(): any {
    this.electron.window.minimize();
  }

  channel(name: string): any {
    if (this.channelSubscription) this.channelSubscription.unsubscribe();

    this.channelSubscription = this.data.getStats(name).subscribe((res) => {
      this.channelInfo = res;
      console.log('API result: ', res);
    });
  }
}
