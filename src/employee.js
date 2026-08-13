export const employees = [
  {
    firstName: "Alex",
    lastName: "Rivera",
    email: "alex.rivera@school.edu",
    category: "Faculty",
  },
  {
    firstName: "Jordan",
    lastName: "Chen",
    email: "jordan.chen@school.edu",
    category: "Administration",
  },
  {
    firstName: "Priya",
    lastName: "Nair",
    email: "priya.nair@school.edu",
    category: "Support Staff",
  },
];

export function fullName(employee) {
  return `${employee.firstName} ${employee.lastName}`;
}

export function renderProfile(employee) {
  return [
    { label: "First Name", value: employee.firstName },
    { label: "Last Name", value: employee.lastName },
    { label: "Email", value: employee.email },
    { label: "Employee Category", value: employee.category },
  ];
}

export function initStaffMenu(doc, employee = employees[0]) {
  const menu = doc.getElementById("staffMenu");
  const icon = doc.getElementById("staffIcon");
  if (!menu || !icon) {
    return null;
  }

  menu.innerHTML = "";
  const name = doc.createElement("h3");
  name.innerText = fullName(employee);
  menu.appendChild(name);

  const list = doc.createElement("dl");
  renderProfile(employee).forEach((field) => {
    const term = doc.createElement("dt");
    term.innerText = field.label;
    const value = doc.createElement("dd");
    value.innerText = field.value;
    list.appendChild(term);
    list.appendChild(value);
  });
  menu.appendChild(list);

  icon.onclick = () => {
    const expanded = icon.getAttribute("aria-expanded") === "true";
    icon.setAttribute("aria-expanded", expanded ? "false" : "true");
  };

  return menu;
}

export default employees;
