
export interface NavLink {
  name: string;
  path: string;
  hasDropdown?: boolean;
}

export interface Feature {
  title: string;
  description: string;
  icon?: string;
}

export interface Plan {
  name: string;
  features: string[];
  buttonText: string;
  color: string;
}
