import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";
import { CatService } from "./cat.service";
import { anyString, instance, mock, when } from "ts-mockito";
import { of } from "rxjs";
import { By } from "@angular/platform-browser";

describe("AppComponent", () => {
  let mockedCatService;
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    mockedCatService = mock(CatService);
  }));

  async function configureTestingModule() {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: CatService, useValue: instance(mockedCatService) }
      ],
      declarations: [AppComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it("should have catService response as img source", async () => {
    when(mockedCatService.getCatsFacts()).thenReturn(
      of({
        status: "top",
        message: "yo.png"
      })
    );

    await configureTestingModule();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("img").src).toContain("yo.png");
  });

  it("should have super course as title", async () => {
    when(mockedCatService.getCatsFacts()).thenReturn(
      of({
        status: "top",
        message: "yo.png"
      })
    );
    await configureTestingModule();
    expect(component.title).toBe("Super course");
  });
});
