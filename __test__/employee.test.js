const {
  employees,
  fullName,
  renderProfile,
  initStaffMenu,
} = require("../src/employee");

const createElement = (tag) => ({
  tag,
  children: [],
  innerText: "",
  innerHTML: "",
  attributes: {},
  appendChild(child) {
    this.children.push(child);
  },
  setAttribute(name, value) {
    this.attributes[name] = value;
  },
  getAttribute(name) {
    return this.attributes[name];
  },
});

const createDocument = (elements) => ({
  createElement,
  getElementById: (id) => elements[id] || null,
});

describe("Employee", () => {
  it("Provides mockup employee data", async () => {
    expect(employees.length).toBeGreaterThan(0);
    employees.forEach((employee) => {
      expect(typeof employee.firstName).toBe("string");
      expect(typeof employee.lastName).toBe("string");
      expect(employee.email).toContain("@");
      expect(typeof employee.category).toBe("string");
    });
  });

  it("Builds the full name of an employee", async () => {
    expect(fullName(employees[0])).toBe(
      `${employees[0].firstName} ${employees[0].lastName}`
    );
  });

  it("Renders first name, last name, email and employee category", async () => {
    const profile = renderProfile(employees[0]);
    expect(profile.map((field) => field.label)).toEqual([
      "First Name",
      "Last Name",
      "Email",
      "Employee Category",
    ]);
    expect(profile.map((field) => field.value)).toEqual([
      employees[0].firstName,
      employees[0].lastName,
      employees[0].email,
      employees[0].category,
    ]);
  });
});

describe("Staff menu", () => {
  let staffIcon, staffMenu;
  beforeEach(() => {
    staffIcon = createElement("button");
    staffMenu = createElement("div");
  });

  it("Renders the profile details of the employee", async () => {
    const doc = createDocument({ staffIcon, staffMenu });
    initStaffMenu(doc, employees[1]);

    expect(staffMenu.children[0].innerText).toBe(fullName(employees[1]));
    const details = staffMenu.children[1].children.map((el) => el.innerText);
    expect(details).toEqual([
      "First Name",
      employees[1].firstName,
      "Last Name",
      employees[1].lastName,
      "Email",
      employees[1].email,
      "Employee Category",
      employees[1].category,
    ]);
  });

  it("Toggles the menu when selecting the icon", async () => {
    const doc = createDocument({ staffIcon, staffMenu });
    initStaffMenu(doc);

    staffIcon.onclick();
    expect(staffIcon.getAttribute("aria-expanded")).toBe("true");
    staffIcon.onclick();
    expect(staffIcon.getAttribute("aria-expanded")).toBe("false");
  });

  it("Does nothing when the menu is not on the page", async () => {
    expect(initStaffMenu(createDocument({}))).toBe(null);
  });
});
