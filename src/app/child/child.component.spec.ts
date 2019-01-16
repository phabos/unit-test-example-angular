import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ChildComponent } from "./child.component";
import { By } from "@angular/platform-browser";
import { Component } from "@angular/core";

@Component({
  template: `
    <app-child [test]="hero"></app-child>
  `
})
class TestHostComponent {
  hero: string;
}

describe("ChildComponent", () => {
  let component: ChildComponent;
  let fixture: ComponentFixture<ChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChildComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should bind toto in html template", () => {
    component.test = "toto";
    fixture.detectChanges();
    const p = fixture.debugElement.query(By.css("p")).nativeElement;
    expect(p.innerHTML).toBe("child works! toto");
  });
});

describe("TestHostChildComponent", () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChildComponent, TestHostComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should bind proper value in child component", () => {
    component.hero = "Kay Panabaker";
    fixture.detectChanges();
    const p = fixture.debugElement.query(By.css("p")).nativeElement;
    expect(p.innerHTML).toBe("child works! Kay Panabaker");
    expect(component).toBeTruthy();
  });
});
