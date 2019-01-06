import { Component } from "@angular/core";
import { CatService, ICatFact } from "./cat.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title: string;
  facts: ICatFact = {
    status: "",
    message: ""
  };

  constructor(private catService: CatService) {}

  ngOnInit() {
    this.title = "Super course";
    this.catService.getCatsFacts().subscribe((facts: ICatFact) => {
      this.facts = facts;
    });
  }
}
