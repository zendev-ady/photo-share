# Nastavení FotoShare na novém PC

## 1. Požadavky

- Node.js 18+
- Git
- VS Code (doporučeno)

## 2. První setup

```bash
# Klonujte repo
git clone https://github.com/zendev-ady/photo-share.git
cd photo-share

# Instalace pnpm (pokud nemáte)
npm install -g pnpm

# Instalace závislostí
pnpm install

# Environment setup
cp .env.example .env.local
```

## 3. Environment Variables

V `.env.local` vyplňte:
```env
NEXT_PUBLIC_SUPABASE_URL=your_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_key_here
```

## 4. Spuštění

```bash
# Dev server
pnpm dev

# Otevřete http://localhost:3000
```

## 5. Supabase (už je nastavené)

Supabase projekt už je vytvořen s:
- ✅ Databáze (galleries + photos tabulky)
- ✅ Storage bucket (photos)
- ✅ Indexy pro performance

**Jen potřebujete zkopírovat credentials do .env.local**

## 6. Troubleshooting

### Balíčky se nenainstalují
```bash
rm -rf node_modules
rm pnpm-lock.yaml
pnpm install
```

### TypeScript chyby
```bash
# Čistý build
rm -rf .next
pnpm build
```

### Supabase connection chyby
- Zkontrolujte .env.local
- Restartujte dev server