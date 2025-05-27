# Comment résoudre les problèmes de cross-origin (CORS) avec un proxy inverse Nginx

## Qu'est-ce que le cross-origin ?

Le partage de ressources entre origines multiples (CORS) est une fonctionnalité de sécurité implémentée par les navigateurs web pour empêcher les sites malveillants de faire des requêtes vers un domaine différent de celui qui a servi la page web d'origine. C'est important pour protéger les données des utilisateurs et prévenir les accès non autorisés aux ressources.

Lorsqu'une page web fait une requête vers un domaine différent, le navigateur vérifie si le serveur de ce domaine autorise les requêtes cross-origin. S'il ne le fait pas, le navigateur bloque la requête et génère une erreur CORS.

```
Access to XMLHttpRequest at 'http://example.com/api/data' from origin 'http://yourdomain.com' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

## Pourquoi les problèmes de cross-origin sont importants ?

Les problèmes de cross-origin sont importants car ils peuvent empêcher des requêtes légitimes d'être traitées, entraînant des fonctionnalités défectueuses dans les applications web.

Par exemple, si vous visitez une page web, puis que cette page web fait une requête AJAX vers un domaine différent, comme votre service bancaire en ligne ou un site de shopping en ligne. Sans la protection du CORS, la page web malveillante pourrait potentiellement accéder aux informations de votre compte bancaire comme votre solde, l'historique des transactions et d'autres données sensibles, ou même effectuer des transactions non autorisées en votre nom.

## Comment résoudre les problèmes de cross-origin avec un proxy inverse Nginx

Tout d'abord, vous devez garantir que votre demande est raisonnable. Comme nous l'avons discuté ci-dessus, les problèmes de cross-origin sont une fonctionnalité de sécurité implémentée par les navigateurs web pour protéger les utilisateurs des sites malveillants.

Utiliser un proxy inverse Nginx pour résoudre les problèmes de cross-origin est une pratique courante. En configurant Nginx pour ajouter les en-têtes CORS appropriés à la réponse, vous pouvez autoriser les requêtes cross-origin depuis des domaines spécifiques ou tous les domaines.

Voici un exemple de configuration Nginx pour résoudre les problèmes de cross-origin :

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://backend_server;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        # Add CORS headers
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization';

        # Handle preflight requests
        if ($request_method = OPTIONS) {
            add_header 'Access-Control-Max-Age' 86400;
            add_header 'Content-Length' 0;
            return 204;
        }
    }
}
```

> Si vous êtes intéressé par la configuration d'un proxy inverse Nginx, veuillez consulter [cet article](/fr/nginx/nginx-reverse-proxy-nodejs.html).

Dans cet exemple, nous autorisons les requêtes cross-origin depuis n'importe quel domaine (`*`). Vous pouvez remplacer `*` par un domaine spécifique si vous souhaitez restreindre l'accès uniquement à ce domaine.

L'en-tête `Access-Control-Allow-Methods` spécifie quelles méthodes HTTP sont autorisées pour les requêtes cross-origin, et l'en-tête `Access-Control-Allow-Headers` spécifie quels en-têtes sont autorisés dans la requête.

L'en-tête `Access-Control-Max-Age` spécifie combien de temps les résultats d'une requête préliminaire peuvent être mis en cache par le navigateur.

Le bloc `if` gère les requêtes préliminaires, qui sont envoyées par le navigateur avant de faire une requête cross-origin pour vérifier si le serveur l'autorise. Si la méthode de requête est `OPTIONS`, nous retournons une réponse `204 No Content` avec les en-têtes CORS appropriés.

Vous pouvez ajuster la configuration selon vos besoins. Faites particulièrement attention à `Access-Control-Allow-Headers`, si vous utilisez des en-têtes personnalisés dans vos requêtes, vous devez les ajouter à cet en-tête.

## Conclusion

En conclusion, les problèmes de cross-origin sont une fonctionnalité de sécurité importante implémentée par les navigateurs web pour protéger les utilisateurs des sites malveillants. Cependant, ils peuvent également bloquer des requêtes légitimes. En utilisant un proxy inverse Nginx pour ajouter les en-têtes CORS appropriés à la réponse, vous pouvez autoriser les requêtes cross-origin depuis des domaines spécifiques ou tous les domaines.

C'est une pratique courante en développement web et peut aider à résoudre efficacement les problèmes de cross-origin.

Veuillez noter que permettre les requêtes cross-origin depuis tous les domaines peut exposer votre application à des risques de sécurité, il est donc important de considérer attentivement les implications de cette configuration et de restreindre l'accès uniquement aux domaines de confiance dans la mesure du possible.