import React from "react";
import { User } from "@/types/user";
import { InputWithLabel } from "../AddEmployeeForm/InputWithLabel";
import { Button } from "../ui/button";

interface PersonalInfoFormProps {
  user: User;
  onSubmit: (data: Partial<User>) => void;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  user,
  onSubmit,
}) => {
  const [formData, setFormData] = React.useState({
    firstname: user.fullname.firstname,
    lastname: user.fullname.lastname || "",
    email: user.email,
    phone: user.phone || "",
    businessName: user.businessName || "",
    gstNumber: user.gstNumber || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      fullname: {
        firstname: formData.firstname,
        lastname: formData.lastname,
      },
      email: formData.email,
      phone: Number(formData.phone),
      businessName: formData.businessName,
      gstNumber: formData.gstNumber,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-primarylight dark:bg-primary p-0 sm:p-6 rounded-lg"
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <InputWithLabel
            label="First Name"
            value={formData.firstname}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, firstname: e.target.value }))
            }
            required
            placeholder="First Name"
            name="firstname"
            type="text"
          />
        </div>
        <div>
          <InputWithLabel
            label="Last Name"
            value={formData.lastname}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, lastname: e.target.value }))
            }
            placeholder="Last Name"
            name="lastname"
            type="text"
          />
        </div>
      </div>

      <div>
        <InputWithLabel
          label="Email"
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          required
          placeholder="Email"
          name="email"
          type="email"
        />
      </div>

      <div>
        <InputWithLabel
          label="Phone"
          value={formData.phone}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, phone: e.target.value }))
          }
          placeholder="Phone"
          name="phone"
          type="tel"
        />
      </div>

      <div>
        <InputWithLabel
          label="Business Name"
          value={formData.businessName}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, businessName: e.target.value }))
          }
          placeholder="Business Name"
          name="businessName"
          type="text"
        />
      </div>

      <div>
        <InputWithLabel
          label="GST Number"
          value={formData.gstNumber}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, gstNumber: e.target.value }))
          }
          placeholder="GST Number"
          name="gstNumber"
          type="text"
        />
      </div>

      <Button variant={"destructive"} type="submit">
        Update Personal Information
      </Button>
    </form>
  );
};
