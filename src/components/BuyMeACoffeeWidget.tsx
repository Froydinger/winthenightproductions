import { useEffect } from "react";

const BuyMeACoffeeWidget = () => {
  useEffect(() => {
    // Check if script already exists
    if (document.querySelector('script[data-name="BMC-Widget"]')) {
      return;
    }

    const script = document.createElement("script");
    script.src = "https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js";
    script.setAttribute("data-name", "BMC-Widget");
    script.setAttribute("data-cfasync", "false");
    script.setAttribute("data-id", "winthenight");
    script.setAttribute("data-description", "Support me on Buy me a coffee!");
    script.setAttribute("data-message", "Thank you for supporting Win The Night™!");
    script.setAttribute("data-color", "#5DCCFF"); // Neon blue to match theme
    script.setAttribute("data-position", "Right");
    script.setAttribute("data-x_margin", "18");
    script.setAttribute("data-y_margin", "18");
    script.async = true;

    document.body.appendChild(script);

    return () => {
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
