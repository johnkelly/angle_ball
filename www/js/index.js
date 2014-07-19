/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

$(function() {
    FastClick.attach(document.body);
});

var app = {
    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        $(document).ready(this.onQueryReady);
    },

    onDeviceReady: function() {
      window.goalSound = new Media("goal.mp3");
      window.bounceSound = new Media("bounce.mp3");
      window.gameOverSound = new Media("gameover.mp3");

      StatusBar.hide();
      gamecenter.auth(null, null);
      var admob_ios_key = 'ca-app-pub-4276911451927978/6847966045';
      var admob_android_key = 'ca-app-pub-4276911451927978/7899760048';
      var adId = (navigator.userAgent.indexOf('Android') >=0) ? admob_android_key : admob_ios_key;

      if( window.plugins && window.plugins.AdMob ) {
        var am = window.plugins.AdMob;

        am.createBannerView(
            {
              'publisherId': adId,
              'adSize': am.AD_SIZE.SMART_BANNER,
              'bannerAtTop': false,
              'overlap': true
            },
            function() {
              am.requestAd(
                { 'isTesting': false },
                function(){
                  am.showAd( true );
                },
                function(){ console.log('failed to request ad'); }
                );
            },
            function(){ console.log('failed to create banner view'); }
            );
      } else {
        console.log('AdMob plugin not available/ready.');
      }
    },

    onQueryReady: function() {
      $(document).ready(function() {
        document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);
        AngleBall.init();
        open_pause_menu();
        if(app.has_read_instructions() == false) {
          open_instructions();
        }
      });
    },

    getPhoneGapPath: function () {
      'use strict';
      var path = window.location.pathname;
      var phoneGapPath = path.substring(0, path.lastIndexOf('/') + 1);
      return phoneGapPath;
    },

    has_read_instructions: function() {
      return (window.localStorage.getItem('has_read_instructions') === "true");
    },

    set_has_read_instructions: function() {
      window.localStorage.setItem('has_read_instructions', true);
    }
};
