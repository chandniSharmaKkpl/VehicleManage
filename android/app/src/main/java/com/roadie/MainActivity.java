package com.roadie;

import android.os.Bundle;
import com.facebook.react.ReactActivity;
import android.content.Intent; 
import org.devio.rn.splashscreen.SplashScreen;
import android.content.res.Configuration;
public class MainActivity extends ReactActivity {



  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "Roadie";
  }



  /**
   * Returns the new configuration It's used fpr dark mode and light mode
   */
  @Override
  public void onConfigurationChanged(Configuration newConfig) {
    super.onConfigurationChanged(newConfig);
    Intent intent = new Intent("onConfigurationChanged");
    intent.putExtra("newConfig", newConfig);
    sendBroadcast(intent);
  }

  @Override
   protected void onCreate(Bundle savedInstanceState) {
       SplashScreen.show(this);  // here
       super.onCreate(savedInstanceState);
   }

}

