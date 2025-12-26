# 🎨 מערכת Helpdesk - ממשק משתמש (React)

ממשק משתמש מודרני ויעיל לניהול כרטיסי תמיכה, משתמשים וקטגוריות. בנוי עם **React 19**, **TypeScript**, **Material-UI**, ו-**Vite**.

---

## 📋 מטרת הפרויקט

מערכת ממשק אינטראקטיבי שמאפשרת:
- 🎫 **ניהול כרטיסי תמיכה** - יצירה, עדכון, ביטול
- 🔍 **חיפוש וסינון** - מציאה מהירה של כרטיסים
- 👥 **ניהול משתמשים** - הוסף, ערוך מחק משתמשים
- 📊 **דשבורד** - תרשימים וסטטיסטיקות
- 🔐 **אימות** - כניסה בטוחה עם JWT

---

## 🏗️ מבנה הפרויקט

```
src/
├── pages/                      # דפים עיקריים
│   ├── Dashboard/              # דף הבית עם סטטיסטיקות
│   ├── Heade_Footer/           # Header ו-Footer
│   └── Page404.tsx             # דף שגיאה
│
├── Components/                 # רכיבים (Components)
│   ├── TicketsComponents.tsx   # רכיב ניהול כרטיסים
│   ├── UsersComponents.tsx     # רכיב ניהול משתמשים
│   ├── CommentsComponents.tsx  # רכיב תגובות
│   ├── DashboardCharts.tsx     # רכיב תרשימים
│   └── ManagePrioritiesAndStatuses.tsx  # ניהול קטגוריות
│
├── Route/                      # ניתוב (Routing)
│   ├── router.tsx              # הגדרת נתיבים ראשיים
│   ├── ProtectedRoute.tsx      # הגנה על מסלולים
│   └── routerHomePage.tsx      # נתיבים דף הבית
│
├── layouts/                    # פריסות (Layouts)
│   ├── AppShell.tsx            # מעטפת הראשית
│   ├── MainLayout.tsx          # פריסה ראשית
│   └── SideNav.tsx             # תפריט צד
│
├── services/                   # שירותים (API Calls)
│   ├── Tickets/                # קריאות כרטיסים
│   ├── Users/                  # קריאות משתמשים
│   ├── Comments/               # קריאות תגובות
│   ├── Status_priority/        # קריאות סטטוסים
│   └── Login/                  # קריאות אימות
│
├── Context/                    # State Management
│   └── userContext.tsx         # Context - משתמש וטוקן
│
├── Query/                      # React Query
│   └── useQuery.tsx            # ווקים לשאילתות
│
├── types/                      # TypeScript Types
│   ├── user.ts                 # סוג משתמש
│   ├── ticket.ts               # סוג כרטיס
│   └── comments.ts             # סוג תגובה
│
├── styles/                     # סגנונות
│   ├── globals.css             # CSS גלובלי
│   └── theme.ts                # תעניה Material-UI
│
├── App.tsx                     # רכיב הראשי
├── main.tsx                    # נקודת כניסה
└── index.css                   # סגנונות בסיסיים
```

---

## 📌 טכנולוגיות ראשיות

| טכנולוגיה | גרסה | תוכן |
|-----------|------|-------|
| **React** | 19.2.0 | ספריית הממשק |
| **TypeScript** | 5.9.3 | שפת תכנות בטוחה |
| **Vite** | 7.2.4 | מגדל ופקק מתפתח |
| **Material-UI** | 7.3.6 | רכיבי UI מודרניים |
| **React Router** | 7.11.0 | ניתוב בין דפים |
| **React Query** | 5.90.12 | ניהול שאילתות |
| **Axios** | 1.13.2 | HTTP client |
| **React Hook Form** | 7.69.0 | ניהול טפסים |
| **Recharts** | 3.6.0 | תרשימים ודיאגרמות |
| **Emotion** | 11.14.0 | CSS-in-JS |
| **SweetAlert2** | 11.26.12 | הודעות וחלונות דיאלוג |

---

## 🚀 דפים ותכונות עיקריות

### 📊 Dashboard - דף הבית
- תרשימים של כרטיסים
- סטטיסטיקות כלליות
- קישורים מהירים למשימות

### 🎫 Tickets - ניהול כרטיסים
- **צפייה**: טבלה עם כל הכרטיסים
- **יצירה**: טופס הוספת כרטיס חדש
- **עדכון**: שינוי סטטוס, עדיפות, תיאור
- **מחיקה**: הסרת כרטיס
- **סינון**: לפי סטטוס, עדיפות, משתמש

### 👥 Users - ניהול משתמשים
- **צפייה**: רשימת כל המשתמשים
- **יצירה**: הוספת משתמש חדש (admin בלבד)
- **עדכון**: שינוי פרטים או תפקיד
- **מחיקה**: הסרת משתמש

### 💬 Comments - תגובות
- הוספת תגובה לכרטיס
- צפייה בכל התגובות
- הצגת שם המחבר

### ⚙️ Settings - הגדרות
- ניהול **סטטוסים** (חדש, בעבודה, סגור)
- ניהול **עדיפויות** (גבוה, בינוני, נמוך)

### 🔐 Login - כניסה למערכת
- דף כניסה עם אימות
- שמירת JWT token
- הפנייה לדשבורד אחרי כניסה בהצלחה

---

## 📦 התקנה והפעלה

### דרישות מוקדמות
- **Node.js** v16 ומעלה
- **npm** או **yarn**
- **Helpdesk API** פועלת על `http://localhost:3000`

### שלבים

#### 1️⃣ התקנה
```bash
npm install
```

#### 2️⃣ הגדרות סביבה
יצור קובץ `.env.local` בשורש הפרויקט:
```env
VITE_API_URL=http://localhost:3000/api
```

#### 3️⃣ הפעלה במצב פיתוח
```bash
npm run dev
```
הממשק יפעל על `http://localhost:5173`

#### 4️⃣ בנייה לייצור
```bash
npm run build
```

#### 5️⃣ עיון בתוצאה
```bash
npm run preview
```

---

## 🎯 זרימת העבודה

### אימות ודעת משתמש
```
1. משתמש מכניס שם משתמש וסיסמה בדף Login
   ↓
2. הקוד שולח POST ל-/auth/login
   ↓
3. שרת מחזיר JWT token (אם נכון)
   ↓
4. ממשק שומר ב-localStorage וב-Context
   ↓
5. הממשק מוציא את משתמש מ-Login למסלול הלא מוגן (Protected)
   ↓
6. בכל בקשה HTTP, ה-token מצורף כ-Header Authorization
```

### שאילתות API
```
Axios Instance → Token Interceptor → API Call → Response/Error
     ↓
React Query → Caching → UI Update
```

### ניהול State
```
App.tsx
  ↓
QueryClientProvider (React Query)
  ↓
UserProvider (Context - user + token)
  ↓
RouterProvider (React Router)
  ↓
Protected Routes
```

---

## 🔧 הגדרות חשובות

### vite.config.ts
הגדרת ה-build tool:
- HMR (Hot Module Replacement) לעדכון בזמן אמת
- Proxy API כדי להעביר בקשות לשרת

### tsconfig.json
הגדרות TypeScript:
- Strict mode - בדיקה קפדנית של סוגים
- Module resolution - מודולים

### package.json Scripts
```json
{
  "dev": "vite",                    # הפעלה מצב פיתוח
  "build": "tsc -b && vite build",  # בנייה
  "lint": "eslint .",               # בדיקת קוד
  "preview": "vite preview"         # צפיה בתוצאה
}
```

---

## 🎨 Material-UI Theme

קובץ `src/styles/theme.ts` מכיל:
- צבעים מותאמים
- typography
- סגנונות רכיבים

---

## 📱 Responsive Design

הממשק מעוצב להתאמה:
- 📱 **סלולרי** - תפריט שקע, תצוגה מקודדת
- 💻 **שולחני** - תצוגה מלאה, תפריט צד קבוע
- 🖥️ **מסך גדול** - פריסה אופטימלית

---

## 🔐 אבטחה

### JWT Token
- שמור ב-`localStorage` (כן, זה לא הבטוח ביותר)
- מצורף בכל בקשה כ-`Authorization: Bearer {token}`
- אם פקע, הממשק מחזיר למסך Login

### Protected Routes
- רכיב `ProtectedRoute.tsx` בודק אם משתמש מחובר
- אם לא, מפנה ל-Login

### Role-Based Access
- כמה דפים/תכונות נגישים רק ל-admin
- בודקים `user.role` מ-Context

---

## 🐛 Debugging

### React DevTools
התקן את ההרחבה `React Developer Tools` בדפדפן

### Vite DevTools
צפה בקורות בטבלה Network בדפדפן

### Console
בדוק שגיאות ב-Developer Tools (F12)

### API Calls
אם בעיות בתקשורת עם השרת:
1. בדוק ש-API רץ על `localhost:3000`
2. בדוק ב-Console לשגיאות CORS
3. בדוק ש-VITE_API_URL נכון

---

## 📊 ניהול מצב (State Management)

### Context API
קובץ `Context/userContext.tsx` שומר:
- `user` - פרטי המשתמש המחובר
- `token` - JWT token
- `login()` - פונקציית כניסה
- `logout()` - פונקציית יציאה

### React Query
ניהול שאילתות בצד השרת:
- מטמון אוטומטי
- סנכרון בזמן אמת
- ניהול שגיאות

---

## 📚 קבצים חשובים

| קובץ | תוכן |
|------|-------|
| `src/App.tsx` | רכיב הראשי |
| `src/Route/router.tsx` | הגדרת נתיבים |
| `src/Context/userContext.tsx` | ניהול משתמש |
| `src/services/` | קריאות API |
| `src/Components/` | רכיבים |
| `src/types/` | TypeScript Types |

---

## 💡 טיפים לפיתוח

- 🔥 Use `npm run dev` לפיתוח בזמן אמת
- 🛠️ צפה ב-Network tab בעת בדיקה
- 📝 הוסף `console.log()` לדיבאגינג
- ✅ הרץ `npm run lint` לפני commit
- 🧪 בדוק בדפדפנים שונים

---

## 🚀 יוצא לייצור (Production)

```bash
# בנייה
npm run build

# בדיקה לפני העלאה
npm run preview

# העלאה ל-server (deploy)
# upload את תיקיית 'dist' לשרת
```

---

## 📝 רישיון
MIT

---

**נבנה עם ❤️ בעזרת React & TypeScript**

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
