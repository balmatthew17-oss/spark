plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

// Each CI build gets a higher version code so the phone accepts it as an update.
val buildNumber = (System.getenv("GITHUB_RUN_NUMBER") ?: "1").toInt()

android {
    namespace = "com.spark.learn"
    compileSdk = 36

    defaultConfig {
        applicationId = "com.spark.learn"
        minSdk = 26
        targetSdk = 34
        versionCode = buildNumber
        versionName = "1.0.$buildNumber"
    }

    // The same key signs every build, so new versions install over the old one.
    signingConfigs {
        create("spark") {
            storeFile = file("spark.jks")
            storePassword = "spark-key-01"
            keyAlias = "spark"
            keyPassword = "spark-key-01"
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            signingConfig = signingConfigs.getByName("spark")
        }
        debug {
            signingConfig = signingConfigs.getByName("spark")
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions {
        jvmTarget = "17"
    }
    lint {
        checkReleaseBuilds = false
        abortOnError = false
    }
}

dependencies {
    implementation("androidx.activity:activity-ktx:1.9.3")
}
