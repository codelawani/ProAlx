import logging
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

log_file = "logs/errors.log"
file_handler = logging.FileHandler(log_file)
file_handler.setLevel(logging.DEBUG)

formatter = logging.Formatter(
    "%(asctime)s - %(name)s - %(levelname)s - %(message)s")
file_handler.setFormatter(formatter)

logger.addHandler(file_handler)
