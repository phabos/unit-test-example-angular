import { TestBed, getTestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { CatService } from "./cat.service";

describe("CatService", () => {
  let injector: TestBed;
  let service: CatService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CatService]
    });
    injector = getTestBed();
    service = injector.get(CatService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should return an Observable<ICatFact>", () => {
    const dummyCat = {
      message: "cool",
      status: "test"
    };

    service.getCatsFacts().subscribe(facts => {
      expect(facts.message).toBe("cool");
    });

    const req = httpMock.expectOne(`https://dog.ceo/api/breeds/image/random`);
    expect(req.request.method).toBe("GET");
    req.flush(dummyCat);
  });

  it("should return an error if http request failed", () => {
    service.getCatsFacts().subscribe(facts => {
      expect(typeof facts).toBe("undefined");
    });

    httpMock
      .expectOne(`https://dog.ceo/api/breeds/image/random`)
      .error(new ErrorEvent("401"), { status: 401 });
  });
});
