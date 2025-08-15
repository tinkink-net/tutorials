# Problemas de Autenticación de MongoDB con Node.js: Solucionando Problemas de Conexión con authSource

<Validator lang="es" :platform-list="['Node.js 18+', 'MongoDB 5+', 'Mongoose 7+']" date="2025-08-15" />

## Antecedentes: Problemas de Autenticación y Conexión de MongoDB

Cuando se conecta a MongoDB usando Mongoose en aplicaciones Node.js, los desarrolladores a menudo encuentran errores de autenticación como:

```
errmsg: 'Authentication failed.',
code: 18,
codeName: 'AuthenticationFailed'
```

Estos errores pueden ser particularmente confusos cuando el nombre de usuario, la contraseña y el nombre de la base de datos son correctos. Una causa común de este problema es no especificar la base de datos de autenticación correcta, lo que puede resolverse añadiendo `authSource: 'admin'` a las opciones de conexión.

## Entendiendo la Base de Datos de Autenticación de MongoDB

En MongoDB, la autenticación es manejada por la base de datos `admin` por defecto. Cuando creas usuarios en MongoDB, pueden estar asociados con bases de datos específicas, pero el proceso de autenticación en sí típicamente ocurre a través de la base de datos `admin`.

Cuando no especificas el parámetro `authSource` en tu cadena de conexión u opciones, MongoDB podría intentar autenticar contra la base de datos objetivo en lugar de la base de datos `admin` donde las credenciales de usuario están realmente almacenadas.

## El Problema: Fallo de Autenticación

Veamos un patrón de conexión incorrecto común:

```javascript
const mongoose = require('mongoose');

// ❌ Incorrecto - Falta authSource
const connectionString = 'mongodb://username:password@localhost:27017/myDatabase';
mongoose.connect(connectionString);

// ❌ También incorrecto - Todavía falta authSource
mongoose.connect('mongodb://localhost:27017/myDatabase', {
  auth: {
    username: 'myUser',
    password: 'myPassword'
  }
});
```

Ambos intentos de conexión podrían fallar con errores de autenticación, incluso si tu nombre de usuario y contraseña son correctos.

## La Solución: Añadir authSource

Aquí están las formas correctas de conectarse a MongoDB con la fuente de autenticación adecuada:

### Método 1: Usando Cadena de Conexión con authSource

```javascript
const mongoose = require('mongoose');

// ✅ Correcto - Añadiendo authSource a la cadena de conexión
const connectionString = 'mongodb://username:password@localhost:27017/myDatabase?authSource=admin';
mongoose.connect(connectionString);
```

### Método 2: Usando Opciones de Conexión

```javascript
const mongoose = require('mongoose');

// ✅ Correcto - Añadiendo authSource en las opciones de conexión
mongoose.connect('mongodb://localhost:27017/myDatabase', {
  auth: {
    username: 'myUser',
    password: 'myPassword'
  },
  authSource: 'admin'  // Esta es la adición clave
});
```

## Configuración de Variables de Entorno

Es una buena práctica almacenar tus detalles de conexión en variables de entorno:

Archivo `.env`:
```env
MONGODB_URI=mongodb://localhost:27017/myDatabase
DB_USER=myUsername
DB_PASS=myPassword
```

Código de conexión:
```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = `${process.env.MONGODB_URI}?authSource=admin`;

  try {
    const conn = await mongoose.connect(uri, {
      auth: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS
      },
      authSource: 'admin'
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

connectDB();
```

## Escenarios Comunes Donde se Requiere authSource

1. **MongoDB Atlas**: Cuando se usa MongoDB Atlas, normalmente necesitas especificar `authSource=admin`
2. **MongoDB en Docker**: Contenedores que ejecutan MongoDB con autenticación habilitada
3. **Instancias de MongoDB en producción**: La mayoría de las configuraciones de MongoDB en producción requieren una fuente de autenticación explícita
4. **Despliegues personalizados de MongoDB**: Cuando la base de datos de autenticación no es la misma que la base de datos objetivo

## Valores Alternativos para authSource

Aunque `admin` es el valor más común para `authSource`, podrías encontrar otros escenarios:

```javascript
// Cuando el usuario es creado en la misma base de datos
mongoose.connect('mongodb://localhost:27017/myDatabase', {
  auth: {
    username: 'myUser',
    password: 'myPassword'
  },
  authSource: 'myDatabase'  // Usuario creado en esta base de datos
});

// Cuando se usa una base de datos de autenticación personalizada
mongoose.connect('mongodb://localhost:27017/myDatabase', {
  auth: {
    username: 'myUser',
    password: 'myPassword'
  },
  authSource: 'authDB'  // Base de datos de autenticación personalizada
});
```

## Consejos para Solucionar Problemas

1. **Verificar Permisos de Usuario**: Asegúrate de que tu usuario de MongoDB tenga los roles apropiados:
   ```javascript
   // En el shell de MongoDB
   db.createUser({
     user: "myUser",
     pwd: "myPassword",
     roles: [
       { role: "readWrite", db: "myDatabase" },
       { role: "dbAdmin", db: "myDatabase" }
     ]
   });
   ```

2. **Verificar Cadena de Conexión**: Revisa todas las partes de tu cadena de conexión:
   ```
   mongodb://[username:password@]host:port/database?authSource=admin
   ```

3. **Revisar Logs de MongoDB**: Mira los logs del servidor MongoDB para mensajes de error más detallados.

4. **Probar con el Shell de MongoDB**: Intenta conectarte primero con el shell de mongo:
   ```bash
   mongo mongodb://username:password@localhost:27017/myDatabase?authSource=admin
   ```

## Resumen

El parámetro `authSource: 'admin'` es crucial para una autenticación exitosa de MongoDB en muchos escenarios. Cuando encuentres errores de autenticación con Mongoose, siempre verifica si estás especificando correctamente la fuente de autenticación. Esta simple adición puede resolver muchos problemas de conexión y es un requisito común para despliegues de MongoDB en producción.

Recuerda:
- Siempre especificar `authSource` cuando te conectes a instancias autenticadas de MongoDB
- Usar variables de entorno para información de conexión sensible
- Manejar los errores de conexión con elegancia
- Probar tu conexión en desarrollo antes de desplegar a producción