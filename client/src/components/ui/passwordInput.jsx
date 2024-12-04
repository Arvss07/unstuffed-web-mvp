import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

const PasswordInput = React.forwardRef(({ className, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
      <button
        type="button"
        onClick={toggleShowPassword}
        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
      >
        {showPassword ? (
          <EyeOff className="h-5 w-5" />
        ) : (
          <Eye className="h-5 w-5" />
        )}
      </button>
    </div>
  );
});

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
