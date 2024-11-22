bind = "0.0.0.0:$PORT"
workers = 4
threads = 4
timeout = 120
accesslog = '-'
access_log_format = '%(h)s %(l)s %(u)s %(t)s "%(r)s" %(s)s %(b)s "%(f)s" "%(a)s"'
