######################################################
#
# Agave ToGo Web Container Image
# Tag: agaveplatform/togo
#
# This is the image hosting the static assets comprising
# Agave ToGo. SSL is supported.
#
# https://github.com/agaveplatform/agave-togo
# http://togo.agaveplatform.org
#
######################################################

FROM agaveplatform/apache:2.4

MAINTAINER Rion Dooley <deardooley@gmail.com>

ENV DOCUMENT_ROOT /var/www/html

ADD . /var/www/html

### enable compression and etags for caching
RUN sed -i 's/^#LoadModule deflate_module/LoadModule deflate_module/g' /usr/local/apache2/conf/httpd.conf && \
    sed -i 's/^#LoadModule expires_module/LoadModule expires_module/g' /usr/local/apache2/conf/httpd.conf && \
    mv /var/www/html/docker-entrypoint.sh /togo-entrypoint.sh

ENTRYPOINT ["/togo-entrypoint.sh"]

CMD ["httpd", "-D", "FOREGROUND"]
