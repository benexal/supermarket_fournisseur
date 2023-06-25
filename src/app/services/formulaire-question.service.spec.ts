import { TestBed } from '@angular/core/testing';

import { FormulaireQuestionService } from './formulaire-question.service';

describe('FormulaireQuestionService', () => {
  let service: FormulaireQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormulaireQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
