FROM public.ecr.aws/amazonlinux/amazonlinux:2022

# install dependencies
RUN dnf -y update \
    && dnf -y install \
    bzip2 \
    bzip2-devel \
    gcc \
    httpd \
    httpd-devel \
    libcurl-devel \
    ncurses-devel \
    openssl-devel \
    python3 \
    python3-devel \
    python3-pip \
    python3-setuptools \
    python3-wheel \
    tar \
    xz-devel \
    zlib-devel \
    && dnf clean all

# install htslib
ENV HTSLIB_VERSION=1.16

RUN cd /tmp \
    && curl -L https://github.com/samtools/htslib/releases/download/${HTSLIB_VERSION}/htslib-${HTSLIB_VERSION}.tar.bz2 | tar -xj \
    && pushd htslib-${HTSLIB_VERSION} \
    && ./configure \
    && make \
    && make install \
    && popd \
    && rm -rf htslib-${HTSLIB_VERSION}

ENV CPATH=$CPATH:/usr/include/httpd/:/usr/include/apr-1/

ENV LDLINK_HOME=/opt/ldlink

RUN mkdir -p ${LDLINK_HOME}

WORKDIR ${LDLINK_HOME}

COPY server/requirements.txt .

RUN python3 -m pip install -r requirements.txt

COPY server/ .

RUN chown -R apache:apache ${LDLINK_HOME}

CMD mod_wsgi-express start-server ${LDLINK_HOME}/LDlink.wsgi \
    --httpd-executable=/usr/sbin/httpd \
    --modules-directory /usr/lib64/httpd/modules/ \
    --user apache \
    --group apache \
    --log-to-terminal \
    --port 8000 \
    --working-directory ${LDLINK_HOME} \
    --header-buffer-size 50000000 \
    --response-buffer-size 50000000 \
    --limit-request-body 5368709120 \
    --initial-workers 1 \
    --socket-timeout 9000 \
    --queue-timeout 9000 \
    --shutdown-timeout 9000 \
    --graceful-timeout 9000 \
    --connect-timeout 9000 \
    --request-timeout 9000 \
    --keep-alive-timeout 300 \
    --processes `nproc` \
    --threads 1
