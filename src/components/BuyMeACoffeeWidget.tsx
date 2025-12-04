import { useEffect } from "react";

const BuyMeACoffeeWidget = () => {
  useEffect(() => {
    // Remove any existing BMC widget elements first
    const existingScript = document.querySelector('script[data-name="BMC-Widget"]');
    const existingWidget = document.getElementById('bmc-wbtn');
    
    if (existingScript) existingScript.remove();
    if (existingWidget) existingWidget.remove();

    // Create and append the script
    const script = document.createElement("script");
    script.setAttribute("data-name", "BMC-Widget");
    script.setAttribute("data-cfasync", "false");
    script.setAttribute("data-id", "winthenight");
    script.setAttribute("data-description", "Support me on Buy me a coffee!");
    script.setAttribute("data-message", "Thank you for supporting Win The Night™!");
    script.setAttribute("data-color", "#5DCCFF"); // Neon blue to match site theme
    script.setAttribute("data-position", "Right");
    script.setAttribute("data-x_margin", "18");
    script.setAttribute("data-y_margin", "18");
    script.src = "https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js";
    
    document.body.appendChild(script);

    return () => {
      // Cleanup on unmount
      const scriptEl = document.querySelector('script[data-name="BMC-Widget"]');
      const widgetEl = document.getElementById('bmc-wbtn');
      if (scriptEl) scriptEl.remove();
      if (widgetEl) widgetEl.remove();
    };
  }, []);

  return null;
};

export default BuyMeACoffeeWidget;
