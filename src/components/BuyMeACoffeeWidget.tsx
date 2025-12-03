import { useEffect } from "react";

// Module-level variable to track if script has been loaded
let scriptLoaded = false;

const BuyMeACoffeeWidget = () => {
  useEffect(() => {
    // Prevent double loading
    if (scriptLoaded) {
      console.log("BMC widget already initialized");
      return;
    }

    // Check if script already exists in DOM
    const existingScript = document.querySelector('script[data-name="BMC-Widget"]');
    if (existingScript) {
      console.log("BMC widget script already exists in DOM");
      scriptLoaded = true;
      return;
    }

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      console.log("Loading BMC widget...");
      const script = document.createElement("script");
      script.setAttribute("data-name", "BMC-Widget");
      script.setAttribute("data-cfasync", "false");
      script.setAttribute("data-id", "winthenight");
      script.setAttribute("data-description", "Support me on Buy me a coffee!");
      script.setAttribute("data-message", "Thank you for supporting Win The Night™!");
      script.setAttribute("data-color", "#5F7FFF");
      script.setAttribute("data-position", "Right");
      script.setAttribute("data-x_margin", "18");
      script.setAttribute("data-y_margin", "18");
      script.src = "https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js";
      script.async = true;

      script.onload = () => {
        console.log("BMC widget script loaded successfully");
        scriptLoaded = true;
      };

      script.onerror = (error) => {
        console.error("Failed to load BMC widget script:", error);
      };

      document.body.appendChild(script);
    }, 500);

    return () => {
      clearTimeout(timer);
      // Don't cleanup the widget - let it persist across route changes
    };
  }, []);

  return null;
};

export default BuyMeACoffeeWidget;
