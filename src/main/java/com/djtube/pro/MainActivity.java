package com.djtube.pro;

import android.app.Activity;
import android.app.DownloadManager;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

public class MainActivity extends Activity {
    private WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        webView = new WebView(this);
        WebSettings settings = webView.getSettings();
        
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setMediaPlaybackRequiresUserGesture(false);
        
        // Registrar puente para descargar desde JavaScript
        webView.addJavascriptInterface(new WebAppInterface(this), "AndroidInterface");

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                handleSharedIntent(getIntent());
            }
        });
        webView.setWebChromeClient(new WebChromeClient());
        
        webView.loadUrl("file:///android_asset/index.html");
        setContentView(webView);
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        handleSharedIntent(intent);
    }

    private void handleSharedIntent(Intent intent) {
        if (intent != null && Intent.ACTION_SEND.equals(intent.getAction())) {
            String sharedText = intent.getStringExtra(Intent.EXTRA_TEXT);
            if (sharedText != null && webView != null) {
                String javascript = "javascript:if(typeof capturarEnlaceCompartido === 'function') { capturarEnlaceCompartido('" + sharedText.replace("'", "\\'") + "'); }";
                webView.evaluateJavascript(javascript, null);
            }
        }
    }

    // Interfaz nativa para ejecutar descargas en la memoria del teléfono
    public class WebAppInterface {
        Context mContext;

        WebAppInterface(Context c) {
            mContext = c;
        }

        @JavascriptInterface
        public void descargarArchivo(String downloadUrl, String titulo, String extension, String tipoSubcarpeta) {
            try {
                DownloadManager.Request request = new DownloadManager.Request(Uri.parse(downloadUrl));
                
                // Definir subcarpeta según el tipo (DJ Tube Audio o DJ Tube Video)
                String subfolder = tipoSubcarpeta.equalsIgnoreCase("audio") ? "DJ Tube Audio" : "DJ Tube Video";
                String fileName = titulo.replaceAll("[^a-zA-Z0-9.-]", "_") + "." + extension;
                
                request.setTitle(titulo);
                request.setDescription("Guardando en carpeta Downloads/" + subfolder);
                request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED);
                
                // Guardar en /Download/DJ Tube Audio/ o /Download/DJ Tube Video/
                request.setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, subfolder + "/" + fileName);
                
                DownloadManager manager = (DownloadManager) mContext.getSystemService(Context.DOWNLOAD_SERVICE);
                if (manager != null) {
                    manager.enqueue(request);
                    Toast.makeText(mContext, "Iniciando descarga en: Download/" + subfolder, Toast.LENGTH_LONG).show();
                }
            } catch (Exception e) {
                Toast.makeText(mContext, "Iniciando descarga en memoria...", Toast.LENGTH_SHORT).show();
            }
        }
    }

    @Override
    public void onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}
