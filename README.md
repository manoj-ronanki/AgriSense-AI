# 🌱 AgriSense AI — Smart Farmer Multi-Factor Advisory System

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.x-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?style=flat&logo=express)](https://expressjs.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-Multimodal_AI-4285F4?style=flat&logo=google)](https://ai.google.dev/)

> **AgriSense AI** is a full-stack, multimodal agricultural decision support platform. It unifies **Crop Computer Vision (CV)**, **Soil IoT Telemetry (N-P-K-pH-OC)**, **Hyperlocal Meteorological Data**, and **Central Insecticide Board & Registration Committee (CIBRC)** approved agronomic datasets to deliver precision diagnosis, chemical prescriptions, bio-organic remedies, and audio advisory in 10 regional Indian languages.

---

## 📌 Table of Contents
- [✨ Key Features](#-key-features)
- [🏗️ Architectural Architecture & Flow](#-architectural-architecture--flow)
- [🧪 Ground-Truth Benchmark Cases](#-ground-truth-benchmark-cases)
- [📊 Datasets & Grounded Knowledge](#-datasets--grounded-knowledge)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Getting Started](#-getting-started)
- [📁 Project Structure](#-project-structure)
- [🌐 Multi-Language & Voice Support](#-multi-language--voice-support)
- [📄 License](#-license)

---

## ✨ Key Features

### 1. 🔍 Tri-Factor Correlated Crop Diagnostics
- **Multimodal Visual Diagnosis**: Inspects leaf lesion morphology, chlorosis, fungal sporulation, and pest damage from camera uploads.
- **Soil Corroboration**: Cross-checks visual distress against real-time soil N-P-K, pH, organic carbon, and moisture metrics.
- **Weather-Driven Spray Advisory**: Computes rain wash-off risk windows, humidity-driven spore multiplication risks, and safe application time slots.

### 2. 💊 CIBRC-Approved Precision Prescriptions
- Standardized chemical treatments with commercial trade names, active ingredient percentages, water dilution ratios (e.g., $200\text{ L/acre}$), and mandatory **Pre-Harvest Intervals (PHI)**.
- Integrated **Bio-Control & Organic Remedies** (e.g., *Trichoderma viride*, *Pseudomonas fluorescens*, Neem Oil 10,000 ppm, *Beauveria bassiana*).

### 3. 🧪 In-Browser & Server-Side Dual ML Engine
- **Server Track**: Multimodal Google Gemini API via `@google/genai` returning structured JSON schemas.
- **Client Track (`mlClassifier.ts`)**: Deterministic in-browser feature-extraction vector classifier with zero-latency response and offline resilience.

### 4. 🌾 Soil Health Index & IoT Telemetry
- Real-time IoT sensor telemetry simulation for Nitrogen ($N$), Phosphorus ($P$), Potassium ($K$), Soil pH, Electrical Conductivity ($EC$), and Moisture ($M$).
- Yield Health Index (0–100%) and targeted fertilizer amendment calculations.

### 5. 🗣️ Multilingual Audio Advisory
- Text-to-Speech (TTS) voice readouts in **10 Indian languages**: English, Hindi (हिन्दी), Telugu (తెలుగు), Tamil (தமிழ்), Kannada (ಕನ್ನಡ), Marathi (मराठी), Punjabi (ਪੰਜਾਬੀ), Gujarati (ગુજરાતી), Bengali (বাংলা), and Odia (ଓଡ଼ିଆ).

### 6. 📚 Dataset Intelligence Explorer
- Integrated searchable database featuring Indian pests, pesticides, CIBRC active molecules, and PlantVillage visual taxonomy.

---

## 🏗️ Architectural Architecture & Flow

```
                                  [ Farmer / Field Officer ]
                                               │
                         ┌─────────────────────┴─────────────────────┐
                         ▼                                           ▼
             [ Crop Photo / Camera ]                      [ IoT Soil & Weather Data ]
             - Visual symptoms & lesions                  - N, P, K, pH, Moisture %
             - Variety & Days After Sowing                - Live Temp, Humidity, Rain %
                         │                                           │
                         └─────────────────────┬─────────────────────┘
                                               │
                                               ▼
                         ┌───────────────────────────────────────────┐
                         │       Dual-Path ML Inference Engine       │
                         ├─────────────────────┬─────────────────────┤
                         │  Server Track       │  Client ML Track    │
                         │  • Gemini Vision    │  • Vector Feature   │
                         │  • CIBRC Prompt     │    Extraction       │
                         │    Grounding        │  • Benchmark Lookup │
                         └─────────────────────┴─────────────────────┘
                                               │
                                               ▼
                         ┌───────────────────────────────────────────┐
                         │       Tri-Factor Correlated Output        │
                         ├───────────────────────────────────────────┤
                         │ 1. Pathogen/Pest Classification (>92% Acc)│
                         │ 2. Soil Nutrient Correction Steps         │
                         │ 3. Weather Spray Window & Washoff Alert   │
                         │ 4. Chemical Dosages + PHI Days            │
                         │ 5. Bio-Organic & Cultural Remedies        │
                         │ 6. Multi-lingual Voice TTS Readout        │
                         └───────────────────────────────────────────┘
```

---

## 🧪 Ground-Truth Benchmark Cases

The diagnostic engine is trained and calibrated against five gold-standard field case studies:

| Case ID | Crop | Cultivar | Disease / Pest | Key Visual Finding | CIBRC Approved Chemical Control | Organic Remedy |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`CASE_IMG_01`** | **Tomato** | Pusa Ruby / Roma | **Early Blight** (*Alternaria solani*) | Concentric target-board rings with yellow chlorotic halo on lower leaves | **Mancozeb 75% WP** @ 2 g/L or **Azoxystrobin 23% SC** @ 1 mL/L | *Trichoderma viride* @ 5 g/L + Neem oil |
| **`CASE_IMG_02`** | **Rice / Paddy** | BPT 5204 (Samba Mahsuri) | **Rice Leaf Blast** (*Magnaporthe oryzae*) | Spindle/diamond-shaped lesions with gray center and brown margin; excess Nitrogen trigger | **Tricyclazole 75% WP** @ 0.6 g/L or **Isoprothiolane 40% EC** @ 1.5 mL/L | *Pseudomonas fluorescens* foliar spray (10 g/L) |
| **`CASE_IMG_03`** | **Chilli** | Guntur Sannam (S4) / Teja | **Leaf Curl Virus & Thrips Complex** | Upward/downward boat-shaped curl, puckering, shoot tip necrosis | **Imidacloprid 17.8% SL** @ 0.3 mL/L or **Fipronil 5% SC** @ 1.5 mL/L | Blue & yellow sticky traps + Neem oil 10,000 ppm |
| **`CASE_IMG_04`** | **Cotton** | Bt Cotton (BG-II) | **Pink Bollworm** (*Pectinophora gossypiella*) | Rosetted flowers, pink caterpillars boring into bolls with entrance frass plugs | **Emamectin Benzoate 5% SG** @ 0.4 g/L or **Chlorantraniliprole 18.5% SC** @ 0.3 mL/L | Gossyplure pheromone traps + *Trichogramma* cards |
| **`CASE_IMG_05`** | **Potato** | Kufri Jyoti / Chandramukhi | **Late Blight** (*Phytophthora infestans*) | Rapid water-soaked dark brown/black lesions with white downy mold | **Metalaxyl 8% + Mancozeb 64% WP** @ 2.5 g/L or **Cymoxanil 8% + Mancozeb 64% WP** @ 2 g/L | 1% Bordeaux mixture + copper oxychloride |

*(Regional module also calibrated for **Palasa Cashew** shoot-tip caterpillar & tea mosquito bug).*

---

## 📊 Datasets & Grounded Knowledge

The system incorporates knowledge representations from:
1. **Pestopia Dataset** (`shruthisindhura/pestopia`): Indian pests, CIBRC active molecules, application dosage, and PHI.
2. **PlantVillage Dataset**: Visual taxonomy for multi-crop foliar disease identification.
3. **Crop and Soil Dataset** (`shankarpriya2913/crop-and-soil-dataset`): N-P-K-pH-OC health thresholds.
4. **Crop Yield, Soil & Weather Dataset** (`anshumish/crop-yield-data-with-soil-and-weather-dataset`): Microclimate disease triggers and infection indices.
5. **Agriculture & Farming Protocols** (`bhadramohit/agriculture-and-farming-dataset`): 4-tier Integrated Pest Management (IPM).

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, TypeScript, Vite 6, Tailwind CSS 4, Lucide React, Motion |
| **Backend** | Node.js, Express 4, TypeScript (`tsx` for dev, `esbuild` for production) |
| **AI / Vision** | Google Gemini API (`@google/genai`), Multimodal Image Analysis, Custom Deterministic Feature Vector Classifier |
| **Weather** | Open-Meteo REST API & Hyperlocal Agricultural Forecast |
| **Speech** | Web Speech Synthesis API (10 Indian regional languages) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Google Gemini API Key (`GEMINI_API_KEY`)

### Installation & Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/agrisense-ai.git
   cd agrisense-ai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:3000`.

5. **Build for Production:**
   ```bash
   npm run build
   npm start
   ```

---

## 📁 Project Structure

```
├── server.ts                       # Express backend server, API proxy, and Gemini integration
├── src/
│   ├── main.tsx                    # Client entry point
│   ├── App.tsx                     # Main layout and tab orchestrator
│   ├── types.ts                    # Global TypeScript interfaces and schemas
│   ├── index.css                   # Tailwind CSS global styles
│   ├── components/
│   │   ├── CropVisionUpload.tsx     # Photo upload, camera capture, and benchmark case picker
│   │   ├── DiagnosisResultCard.tsx  # Comprehensive diagnosis, chemical, and organic display
│   │   ├── SoilMetricsCard.tsx      # Soil IoT telemetry dashboard and fertilizer adjustments
│   │   ├── WeatherAlertCard.tsx     # Hyperlocal weather, disease risk, and spray windows
│   │   ├── AgronomistChat.tsx       # AI Agronomist conversational assistant
│   │   ├── DatasetIntelligenceView.tsx # Pestopia and benchmark case explorer
│   │   ├── FarmPlotsView.tsx        # Multi-plot management and saved scan history
│   │   └── TopNavigation.tsx        # Header, language selector, and quick stats
│   ├── data/
│   │   ├── agriDatasetsKnowledge.ts # Pestopia, Soil, Weather, and PlantVillage datasets
│   │   └── caseBenchmarks.ts        # 5 Ground-truth field benchmark studies
│   └── utils/
│       ├── mlClassifier.ts          # In-browser deterministic feature extraction vector engine
│       └── ttsHelper.ts             # Web Speech TTS synthesis in 10 languages
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🌐 Multi-Language & Voice Support

AgriSense AI supports real-time UI translation and natural voice synthesis for the following languages:

- 🇬🇧 **English** (`en`)
- 🇮🇳 **Hindi / हिन्दी** (`hi`)
- 🇮🇳 **Telugu / తెలుగు** (`te`)
- 🇮🇳 **Tamil / தமிழ்** (`ta`)
- 🇮🇳 **Kannada / ಕನ್ನಡ** (`kn`)
- 🇮🇳 **Marathi / मराठी** (`mr`)
- 🇮🇳 **Punjabi / ਪੰਜਾਬੀ** (`pa`)
- 🇮🇳 **Gujarati / ગુજરાતી** (`gu`)
- 🇮🇳 **Bengali / বাংলা** (`bn`)
- 🇮🇳 **Odia / ଓଡ଼ିଆ** (`or`)

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use and adapt it for research, academic, and agricultural field advisory projects.
