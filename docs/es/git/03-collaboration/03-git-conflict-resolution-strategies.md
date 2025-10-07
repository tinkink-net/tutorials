# Estrategias de Resolución de Conflictos en Git

## Introducción
Los conflictos son inevitables. Esta guía va más allá de lo básico: patrones, decisiones y herramientas para resolver rápido y seguro.

## Tipos de Conflicto
| Tipo | Ejemplo | Causa |
|------|---------|-------|
| Contenido | Misma línea editada | Ediciones paralelas |
| Add/Delete | Borrado en uno, modificado en otro | Refactor divergente |
| Rename/Edit | Renombrado + editado | Cambio grande no sincronizado |
| Binario | Imagen modificada ambos | No merge lineal |
| Dir/File | Directorio ↔ archivo | Reestructura |

## Flujo General
```
Detectar → Clasificar → Entender intención → Combinar/Elegir → Probar → Commit
```

## Inspección Rápida
```bash
git status
git diff --name-only --diff-filter=U
git diff --merge
```

## Elegir Ours vs Theirs
```bash
# Conservar nuestra versión
git checkout --ours path/file.txt
# Conservar la otra versión
git checkout --theirs path/file.txt
git add path/file.txt
```
Usar con criterio semántico.

## Patrón Manual Estructurado
1. Leer ambos lados completos
2. Identificar intención (lógica, formato, hotfix)
3. Reconstruir comportamiento deseado
4. Quitar marcadores y testear
5. `git add` → continuar

## Commits Más Pequeños
```bash
git add -p
```
Reduce superficie de conflicto.

## Rebase Estratégico en Ramas Largas
```bash
git fetch origin
git rebase origin/main
```

## Herramientas
| Herramienta | Comando | Notas |
|-------------|---------|-------|
| VS Code | Editor merge | Visual claro |
| Meld | `git mergetool` | Diff visual |
| Beyond Compare | `git mergetool` | Comercial |
| IntelliJ | Agrupa conflictos | Integrado |

## Marcadores Ejemplo
```
<<<<<<< HEAD
applyDiscount(cart, 0.10)
=======
applyDiscount(cart, discountRate())
>>>>>>> feature/dynamic-discount
```
Resultado:
```js
applyDiscount(cart, discountRate() ?? 0.10)
```

## Binarios
```bash
git checkout --theirs assets/logo.png
git add assets/logo.png
```
O regenerar.

## Abortar / Continuar
```bash
git merge --abort
git rebase --abort
git rebase --continue
```

## Rerere
```bash
git config --global rerere.enabled true
```
Reaplica resoluciones previas.

## Prevención
| Técnica | Beneficio |
|---------|-----------|
| Formato consistente | Menos ruido |
| PR pequeños | Menos solapamiento |
| Sync temprano | Menos divergencia |
| Comunicación arquitectónica | Evita trabajo duplicado |
| Feature flags | Merge temprano seguro |

## Red de Seguridad
```bash
./run-tests.sh
git diff --check
```

## Recuperar Resolución Mala
```bash
git reflog
git reset --hard <hash>
```

## Resumen
Los conflictos son señal de innovación paralela. Con proceso sistemático y buenas prácticas se vuelven un bache menor.

---
**Comandos Clave**
```bash
git diff --name-only --diff-filter=U
git checkout --ours <file>
git checkout --theirs <file>
git merge --abort
git rebase --continue
```
