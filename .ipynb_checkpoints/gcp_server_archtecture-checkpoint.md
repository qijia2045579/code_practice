#### nodejs -> pm2 -> long_run.sh -> gunicorn_prod_run.sh -> read config -> flask_restx_api_v04:app

1. It start serving the **long_run.sh**, this is for the long time running

2. In "long_run.sh", it triggering the **gunicorn_prod_run.sh**, this is for the multi-worker task, so that it can handle multiple threads for responsing.

3. In "gunicorn_prod_run.sh", it triggers the **gunicorn_config.py** and **flask_restx_api_v04.py**. This is the basic settings and real server codes.

4. In "flask_restx_api_v04.py", the real server codes existing.