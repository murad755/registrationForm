export const formSelectors = {
  registrationForm: "#userForm, form",
  subjectLabel: "subjects-label",
  // Wrappers
  userNameWrapper: "#userName-wrapper",
  userEmailWrapper: "#userEmail-wrapper",
  genderWrapper: "#genterWrapper",
  BirthDateWrapper: "#dateOfBirth-wrapper",
  hobbiesWrapper: "#hobbiesWrapper",
  addressWrapper: "#currentAddress-wrapper",
  stateCityWrapper: "#stateCity-wrapper",
  // Field selectors
  firstNameField: "#firstName",
  lastNameField: "#lastName",
  emailField: "#userEmail",
  genderRadio: `input[name="gender"]`,
  genderValue: (value) => `input[value="${value}"]`,
  numberField: "#userNumber",
  dateOfBirthInput: "#dateOfBirthInput",
  datePickerModal: ".react-datepicker",
  datePickerDateDropdown: (date) => `.react-datepicker__${date}-select`,
  datePickerDay: (day) => `.react-datepicker__day--${day}`,
  subjectsInput: "#subjectsContainer",
  hobbyCheckbox: '[type="checkbox"]',
  hobbyLabel: `.custom-control-label`,
  fileUploadBtn: "#uploadPicture",
  addressInput: "#currentAddress",
  stateDropdown: "#state",
  cityDropdown: "#city",
  submitBtn: "#submit",
  closePromoBtn: "#close-fixedban",
  promoModal: "#animation_container",
  submitModal: ".modal-content",
  closeModal: "#closeLargeModal",
};

class FormPage {
  fillNameSurnameField(name, surname) {
    cy.get(formSelectors.userNameWrapper)
      .should("contain", "Name")
      .and("be.visible")
      .within(() => {
        cy.get(formSelectors.firstNameField)
          .type(name)
          .should("have.value", name);
        cy.get(formSelectors.lastNameField)
          .type(surname)
          .should("have.value", surname);
      });
  }

  fillEmailField(email) {
    cy.get(formSelectors.userEmailWrapper)
      .should("contain", "Email")
      .and("be.visible")
      .within(() => {
        cy.get(formSelectors.emailField)
          .type(email)
          .should("have.value", email);
      });
  }

  selectGender(gender) {
    cy.get(formSelectors.genderWrapper)
      .should("contain", "Gender")
      .and("be.visible")
      .within(() => {
        cy.get(formSelectors.genderValue(gender)).click({ force: true });
      });
  }

  fillNumberField(number) {
    cy.get(formSelectors.numberField)
      .type(number)
      .should("have.value", number.substring(0, 10));
  }

  selectBirthday(day, month, year) {
    cy.get(formSelectors.dateOfBirthInput).click();
    cy.get(formSelectors.datePickerModal)
      .should("be.visible")
      .within(() => {
        cy.get(formSelectors.datePickerDateDropdown("month")).select(month);
        cy.get(formSelectors.datePickerDateDropdown("year")).select(year);
        cy.get(formSelectors.datePickerDay(day)).click();
      });
  }

  fillSubjectsInput(subject) {
    cy.get(formSelectors.subjectsInput).click().type(`${subject}{enter}`);
  }

  // Checks the checkboxes that are matching your hobbies
  fillHobbiesCheckbox(hobby) {
    cy.get(formSelectors.hobbiesWrapper)
      .should("contain", "Hobbies")
      .and("be.visible")
      .within(() => {
        cy.get(formSelectors.hobbyLabel).each(($el) => {
          const checkbox = cy
            .wrap($el)
            .siblings(formSelectors.hobbyCheckbox)
            .should("not.be.checked");
          hobby.includes($el.text())
            ? checkbox.check({ force: true }).should("be.checked")
            : checkbox.should("not.be.checked");
        });
      });
  }

  uploadPicture(file) {
    cy.get(formSelectors.fileUploadBtn).attachFile(file);
  }

  checkFormContainer() {
    cy.get(formSelectors.registrationForm).should("exist").and("be.visible");
  }

  fillAddressInput(address) {
    cy.get(formSelectors.addressInput)
      .type(address)
      .should("have.value", address);
  }

  selectStateCity(selector, state) {
    cy.get(selector)
      .click()
      .find("div")
      .contains(state)
      .should("be.visible")
      .click();
  }

  submitForm() {
    cy.get(formSelectors.submitBtn).click();
  }

  verifySubmitModal() {
    cy.get(formSelectors.submitModal).should("be.visible").and("exist");
  }

  // Checks all inserted data after submitting the form
  checkSubmittedData(label, value) {
    cy.get(formSelectors.submitModal).within(() => {
      cy.get("table tr").each(($el, index) => {
        cy.wrap($el[index])
          .contains(label[index])
          .siblings()
          .should("contain", value[index]);
      });
    });
  }

  closeSubmitModal() {
    cy.get(formSelectors.closeModal).should("be.visible").click();
    cy.get(formSelectors.submitModal).should("not.exist");
  }

  verifyRequiredField(fieldSelector) {
    cy.get(fieldSelector)
      .should("have.css", "border-color", "rgb(220, 53, 69)")
      .and("be.empty")
      .and("have.attr", "required");
  }

  verifyRequiredRadio() {
    cy.get(formSelectors.genderRadio)
      .siblings("label")
      .should("have.css", "border-color", "rgb(220, 53, 69)")
      .and("not.be.checked");
  }

  verifyEmailField() {
    cy.get(formSelectors.emailField)
      .should("have.css", "border-color", "rgb(40, 167, 69)")
      .and("be.empty");
  }

  verifyBirthdateField() {
    cy.get(formSelectors.dateOfBirthInput).should(
      "have.css",
      "border-color",
      "rgb(40, 167, 69)"
    );
  }

  verifyAddressInput() {
    cy.get(formSelectors.addressInput)
      .should("have.css", "border-color", "rgb(40, 167, 69)")
      .and("be.empty");
  }
}

export default FormPage;
