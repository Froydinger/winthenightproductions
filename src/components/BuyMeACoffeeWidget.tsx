import { useEffect } from "react";

const BuyMeACoffeeWidget = () => {
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      // Check if script already exists
      if (document.querySelector('script[data-name="BMC-Widget"]')) {
        console.log("BMC widget script already exists");
        return;
      }

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
      };

      script.onerror = () => {
        console.error("Failed to load BMC widget script");
      };

      document.body.appendChild(script);
    }, 1000);

    return () => {
      clearTimeout(timer);
      // Cleanup on unmount
      const existingScript = document.querySelector('script[data-name="BMC-Widget"]');
      if (existingScript) {
        existingScript.remove();
      }
      // Remove the widget container
      const widget = document.getElementById("bmc-wbtn");
      if (widget) {
        widget.remove();
      }
    };
  }, []);

  return null;
};

export default BuyMeACoffeeWidget;
