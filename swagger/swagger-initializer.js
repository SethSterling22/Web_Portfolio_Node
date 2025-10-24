window.onload = function() {


      
      
      //<editor-fold desc="Changeable Configuration Block">
      window.ui = SwaggerUIBundle({
        url: "https://aery.stegosaurus-panga.ts.net/api/v1/swagger.json",
        "dom_id": "#swagger-ui",
        deepLinking: true,
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        plugins: [
          SwaggerUIBundle.plugins.DownloadUrl
        ],
        layout: "StandaloneLayout",
        queryConfigEnabled: false,
      })
      
      //</editor-fold>




};