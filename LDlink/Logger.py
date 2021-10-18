#LOGGER.PY
import yaml
import logging
import os
import sys
from logging.handlers import TimedRotatingFileHandler

# retrieve config
with open('config.yml', 'r') as f:
    config = yaml.load(f)

logFilename = config['log']['filename']
logLevel = config['log']['log_level']

if (logLevel == 'DEBUG'):
    logLevel = logging.DEBUG
elif (logLevel == 'INFO'):
    logLevel = logging.INFO
elif (logLevel == 'WARNING'):
    logLevel = logging.WARNING
elif (logLevel == 'ERROR'):
    logLevel = logging.ERROR
elif (logLevel == 'CRITICAL'):
    logLevel = logging.CRITICAL
else:
    logLevel = logging.DEBUG

logging.basicConfig(filename=logFilename, 
                format='%(levelname)s : %(asctime)s : %(message)s', 
                filemode='w', level=logLevel, datefmt='%m-%d-%Y %I:%M:%S')
log = logging.getLogger("LDLink")
#log.propagate = False

#handler to rotate log file at specified time
handler = TimedRotatingFileHandler(logFilename, when="midnight", interval=1)
handler.suffix = "%Y%m%d"
log.addHandler(handler)

def logDebug(message):
    log.debug(message)

def logInfo(message):
    log.info(message)

def logWarning(message):
    log.warning(message)

def logError(message):
    log.error(message)

def logCritical(message):
    log.critical(message)
