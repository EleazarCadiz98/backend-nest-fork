# backend-nest

Es un proyecto base creado con nest, el cual cuenta con algunos servicios básicos y un mockServer para la manipulación de usuarios. 

## Se cuenta con:

- Microservicios
- MockServer
- Test
- Test E2E

## Microservicios

### Servicio de "Operaciones Basicas":
```bash
SUMA:
    curl 'localhost:3000/operaciones/basica?operacion=suma&a=10&b=30'

RESTA:
    curl 'localhost:3000/operaciones/basica?operacion=resta&a=10&b=5'

DIVISION:
    curl 'localhost:3000/operaciones/basica?operacion=division&a=10&b=5'

MULTIPLICACION:
    curl 'localhost:3000/operaciones/basica?operacion=multiplicacion&a=10&b=5'
```

### Servicio de "Operacion Factorial":
```bash
curl 'localhost:3000/operaciones/factorial?a=5'
```

### Servicio de "Operacion de Potencia": 
```bash
curl 'localhost:3000/operaciones/potencia?a=2&b=3' 
```