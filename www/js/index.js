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

var bounceSound = document.getElementById('bounce_sound');
var goalSound = document.getElementById('goal_sound');
var gameOverSound = document.getElementById('gameover_sound');
bounceSound.load();
goalSound.load();
gameOverSound.load();

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
      StatusBar.hide();
      gamecenter.auth(null, null);
      var admob_ios_key = 'ca-app-pub-4276911451927978/9172100847';
      var admob_android_key = 'ca-app-pub-4276911451927978/9172100847';
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
                { 'isTesting':true },
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
      });
    },

    getPhoneGapPath: function () {
      'use strict';
      var path = window.location.pathname;
      var phoneGapPath = path.substring(0, path.lastIndexOf('/') + 1);
      return phoneGapPath;
    }
};
