FROM solr:7.4
USER root
COPY configsets/images/* /userfiles/configsets/images/
COPY scripts/* /userfiles/scripts/
COPY data/* /userfiles/data/
RUN apt-get update && apt-get install zip && chmod -R 777 /userfiles
USER solr

ENTRYPOINT ["/userfiles/scripts/entrypoint.sh"]