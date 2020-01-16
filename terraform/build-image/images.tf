###############################################
###               Variables                 ###
###############################################
variable "outcomes-service-dockerfile" {
  default = "."
}
variable "outcomes-service-name" {
  default = "outcomes-service"
}
variable "outcomes-service-directory" {
  default = "outcomes-service"
}
variable "outcomes-service-source" {
  default = "source"
}
variable "outcomes-service-cleanup" {
  default = "rm -rf node_modules dist package-lock.json"
}
variable "outcomes-service-npminstall" {
  default = "npm install"
}
variable "outcomes-service-npmtest" {
  default = "npm test"
}
variable "outcomes-service-npmbuild" {
  default = "npm run build"
}

#################################################
### OUTCOMES-SERVICE : Build Image Service ###
#################################################
resource "null_resource" "outcomes-service-cleanup" {
  provisioner "local-exec" {
    working_dir = "${var.outcomes-service-source}"
    command = "${var.outcomes-service-cleanup}"
  }
}

resource "null_resource" "outcomes-service-install" {
  depends_on = [null_resource.outcomes-service-cleanup]
  provisioner "local-exec" {
    working_dir = "${var.outcomes-service-source}"
    command = "${var.outcomes-service-npminstall}"
  }
}

resource "null_resource" "outcomes-service-test" {
  depends_on = [null_resource.outcomes-service-install]
  provisioner "local-exec" {
    working_dir = "${var.outcomes-service-source}"
    command = "${var.outcomes-service-npmtest}"
  }
}

resource "null_resource" "outcomes-service-build" {
  depends_on = [null_resource.outcomes-service-install]
  provisioner "local-exec" {
    working_dir = "${var.outcomes-service-source}"
    command = "${var.outcomes-service-npmbuild}"
  }
}

resource "null_resource" "outcomes-service" {
  depends_on = [null_resource.outcomes-service-build]
  provisioner "local-exec" {
    command = "docker build -t ${var.outcomes-service-name} ${var.outcomes-service-dockerfile}"
  }
}
