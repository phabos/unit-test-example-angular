import {
  TestBed,
  async,
  ComponentFixture,
  inject
} from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";
import { CatService } from "./cat.service";
import { anyString, instance, mock, when } from "ts-mockito";
import { Observable, of } from "rxjs";
import { By } from "@angular/platform-browser";
import { NO_ERRORS_SCHEMA } from "@angular/core";

// describe("AppComponent", () => {
//   let mockedCatService;
//   let component: AppComponent;
//   let fixture: ComponentFixture<AppComponent>;

//   beforeEach(async(() => {
//     mockedCatService = mock(CatService);
//   }));

//   async function configureTestingModule() {
//     TestBed.configureTestingModule({
//       imports: [RouterTestingModule],
//       providers: [
//         { provide: CatService, useValue: instance(mockedCatService) }
//       ],
//       schemas: [NO_ERRORS_SCHEMA],
//       declarations: [AppComponent]
//     }).compileComponents();

//     fixture = TestBed.createComponent(AppComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   }

//   it("should have catService response as img source", async () => {
//     when(mockedCatService.getCatsFacts()).thenReturn(
//       of({
//         status: "top",
//         message: "yo.png"
//       })
//     );

//     await configureTestingModule();

//     const compiled = fixture.debugElement.nativeElement;
//     expect(compiled.querySelector("img").src).toContain("yo.png");
//   });

//   it("should have super course as title", async () => {
//     when(mockedCatService.getCatsFacts()).thenReturn(of({}));
//     await configureTestingModule();
//     expect(component.title).toBe("Super course");
//   });
// });

describe("AppComponent", () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let callSpy: any;

  beforeEach(() => {
    const CatServiceSpy = jasmine.createSpyObj("CatService", ["getCatsFacts"]);
    callSpy = CatServiceSpy.getCatsFacts.and.returnValue(
      of({
        status: "top",
        message: "yo.png"
      })
    );
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        CatService,
        {
          provide: CatService,
          useValue: CatServiceSpy
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should have callSpy called one time", () => {
    expect(callSpy).toHaveBeenCalled();
    expect(callSpy).toHaveBeenCalledTimes(1);
  });

  it("should have catService response as img source", () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("img").src).toContain("yo.png");
  });

  it("should have super course as title", () => {
    expect(component.title).toBe("Super course");
  });
});
