# Git Submodules y Repos Grandes

## Cuándo Considerarlos
| Situación | Submodule | Alternativa |
|-----------|-----------|-------------|
| Dependencia versionada exacta | ✔ | Paquete publicado |
| Desarrollo fuertemente acoplado | ✘ | Monorepo / carpeta |
| Repos muy pesados unidos | A veces | Dividir + fetch parcial |

## Añadir Submodule
```bash
git submodule add https://github.com/org/lib.git libs/lib
```

## Inicializar / Actualizar
```bash
git submodule update --init --recursive
```
Clona y sincroniza anidados.

## Estado
```bash
git submodule status
```
Muestra commit fijado.

## Cambiar Versión
Dentro del submodule:
```bash
cd libs/lib
git fetch
git checkout <tag|commit>
cd ../../
git add libs/lib
git commit -m "chore: bump lib to v1.4.2"
```

## Extraer Cambios Recientes de Todos
```bash
git submodule update --remote --merge
```
Usa rama registrada `.gitmodules`.

## Archivo .gitmodules
```
[submodule "libs/lib"]
	path = libs/lib
	url = https://github.com/org/lib.git
	branch = main
```

## Buenas Prácticas
| Práctica | Razón |
|----------|-------|
| Pocos submodules | Complejidad menor |
| Fijar commit explícito | Reproducibilidad |
| Scripts de sync | Onboarding fácil |
| Documentar actualización | Evitar confusión |

## Problemas Comunes
| Problema | Solución |
|----------|----------|
| Submodule vacío | `git submodule update --init` |
| Cambios no detectados | Commit dentro + padre |
| Rama equivocada | Ajustar en .gitmodules + sync |

## Eliminar Submodule (Secuencia)
```bash
git submodule deinit -f libs/lib
rm -rf .git/modules/libs/lib
rm -rf libs/lib
git rm -f libs/lib
```

## Alternativas Modernas
| Necesidad | Solución |
|-----------|----------|
| Share código interno | Monorepo (pnpm workspaces, Nx, Turborepo) |
| Librerías externas | Registro paquetes (npm, Maven) |
| Repos grandes | Sparse checkout / partial clone |

## Sparse Checkout (Gran Repo)
```bash
git sparse-checkout init --cone
git sparse-checkout set src/core src/api
```

## Partial Clone
```bash
git clone --filter=blob:none --sparse https://github.com/org/big.git
```

## LFS (Archivos Grandes)
```bash
git lfs install
git lfs track "*.psd"
```

## Resumen
Submodules sirven para dependencias pinneadas de bajo cambio. Para colaboración diaria intensiva, prefiere monorepo o empaquetado.
