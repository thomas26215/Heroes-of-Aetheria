import { ApplicationConfig } from '@angular/core';
import { provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),

    // Firebase
    provideFirebaseApp(() =>
      initializeApp({
        projectId: "angular-heroes-c3cd9",
        appId: "1:656205668932:web:3b092c6ada40d1fca29211",
        storageBucket: "angular-heroes-c3cd9.firebasestorage.app",
        apiKey: "AIzaSyDvRA_s_5NLhc5FWG0AXFvbbnS8ogGzBlY",
        authDomain: "angular-heroes-c3cd9.firebaseapp.com",
        messagingSenderId: "656205668932",
        measurementId: "G-WMLC0017JL"
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ]
};

