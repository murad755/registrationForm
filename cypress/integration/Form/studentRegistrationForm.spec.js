import FormPage, { formSelectors } from "../PageObject/form";

describe("Student Registration Form", function () {
  beforeEach(function () {
    cy.fixture("testData").then(function (student) {
      this.student = student;
    });
    cy.visit("/");
    cy.get(formSelectors.closePromoBtn).click();
    cy.get(formSelectors.promoModal).should("not.exist");
  });

  it("Fill the student registration form and submit the info", function () {
    const formPage = new FormPage();
    const studentData = this.student;
    const filePath = "murad.png";

    formPage.checkFormContainer();
    formPage.fillNameSurnameField(studentData.name, studentData.surname);
    formPage.fillEmailField(studentData.email);
    formPage.selectGender(studentData.gender);
    formPage.fillNumberField(studentData.phoneNumber);
    formPage.selectBirthday(studentData.birthday.day, studentData.birthday.month, studentData.birthday.year
    );
    formPage.fillSubjectsInput(studentData.subject);
    formPage.fillHobbiesCheckbox(studentData.hobbies);
    formPage.uploadPicture(filePath);
    formPage.fillAddressInput(studentData.address);
    formPage.selectStateCity(formSelectors.stateDropdown, studentData.state);
    formPage.selectStateCity(formSelectors.cityDropdown, studentData.city);
    formPage.submitForm();
    formPage.verifySubmitModal();
    formPage.checkSubmittedData(studentData.submitLabels, studentData.submitValues);
    formPage.closeSubmitModal();
  });

  it("Submit empty form and check fields", function () {
    const formPage = new FormPage();

    formPage.checkFormContainer();
    formPage.submitForm();
    formPage.verifyRequiredField(formSelectors.firstNameField);
    formPage.verifyRequiredField(formSelectors.lastNameField);
    formPage.verifyRequiredField(formSelectors.numberField);
    formPage.verifyRequiredRadio(formSelectors.genderRadio);
    formPage.verifyEmailField();
    formPage.verifyBirthdateField();
    formPage.verifyAddressInput();
  });
});